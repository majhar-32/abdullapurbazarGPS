const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const events = await prisma.events.findMany({
      orderBy: { event_date: 'desc' },
    });

    // Map to camelCase for frontend
    const formattedEvents = events.map(event => ({
      ...event,
      id: event.id.toString(),
      eventDate: event.event_date,
      thumbnailUrl: event.thumbnail_url,
      videoUrl: event.video_url,
      createdAt: event.created_at,
      updatedAt: event.updated_at,
      // mediaList is not needed for list view
    }));

    res.json(formattedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
  const { title, description, eventDate, thumbnailUrl, videoUrl, mediaList } = req.body;

  try {
    const event = await prisma.events.create({
      data: {
        title,
        description,
        event_date: new Date(eventDate),
        thumbnail_url: thumbnailUrl,
        video_url: videoUrl,
        created_at: new Date(),
        updated_at: new Date(),
        event_media: {
          create: mediaList ? mediaList.map(media => ({
            media_url: media.mediaUrl,
            media_type: media.mediaType, // 'IMAGE' or 'VIDEO'
          })) : [],
        },
      },
      include: {
        event_media: true,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete related media first (cascade delete manually if not set in DB)
    await prisma.event_media.deleteMany({
      where: { event_id: BigInt(id) },
    });

    await prisma.events.delete({
      where: { id: BigInt(id) },
    });
    res.json({ message: 'Event removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await prisma.events.findUnique({
      where: { id: BigInt(id) },
      include: {
        event_media: true,
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Map to camelCase for frontend
    const formattedEvent = {
      ...event,
      id: event.id.toString(),
      eventDate: event.event_date,
      thumbnailUrl: event.thumbnail_url,
      videoUrl: event.video_url,
      createdAt: event.created_at,
      updatedAt: event.updated_at,
      imageUrls: event.event_media
        .filter(media => media.media_type === 'IMAGE')
        .map(media => media.media_url),
      videoUrl: event.video_url || (event.event_media.find(media => media.media_type === 'VIDEO')?.media_url),
      mediaList: event.event_media.map(media => ({
        id: media.id.toString(),
        mediaUrl: media.media_url,
        mediaType: media.media_type
      }))
    };

    res.json(formattedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, eventDate, thumbnailUrl, videoUrl, mediaList } = req.body;

  try {
    // Transaction to ensure atomicity
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Update event details
      const event = await prisma.events.update({
        where: { id: BigInt(id) },
        data: {
          title,
          description,
          event_date: new Date(eventDate),
          thumbnail_url: thumbnailUrl,
          video_url: videoUrl,
          updated_at: new Date(),
        },
      });

      // 2. Handle media updates if mediaList is provided
      if (mediaList) {
        // Delete existing media
        await prisma.event_media.deleteMany({
          where: { event_id: BigInt(id) },
        });

        // Create new media
        if (mediaList.length > 0) {
          await prisma.event_media.createMany({
            data: mediaList.map(media => ({
              event_id: BigInt(id),
              media_url: media.mediaUrl,
              media_type: media.mediaType,
            })),
          });
        }
      }

      return event;
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getEvents, createEvent, deleteEvent, getEventById, updateEvent };
