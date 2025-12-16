const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public
const getNotices = async (req, res) => {
  try {
    const notices = await prisma.notices.findMany({
      orderBy: { created_at: 'desc' },
    });

    // Map to camelCase for frontend
    const formattedNotices = notices.map(notice => ({
      ...notice,
      id: notice.id.toString(),
      publishDate: notice.publish_date,
      attachmentUrl: notice.attachment_url,
      isUrgent: notice.is_urgent,
      showInTicker: notice.show_in_ticker,
      createdAt: notice.created_at,
      updatedAt: notice.updated_at,
      createdBy: notice.created_by ? notice.created_by.toString() : null
    }));

    res.json(formattedNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a notice
// @route   POST /api/notices
// @access  Private/Admin
const createNotice = async (req, res) => {
  const { title, description, category, publishDate, isUrgent, attachmentUrl, showInTicker } = req.body;

  try {
    const notice = await prisma.notices.create({
      data: {
        title,
        description,
        category,
        publish_date: new Date(publishDate),
        is_urgent: isUrgent || false,
        created_by: BigInt(req.user.id), // Assuming req.user is set by auth middleware
        attachment_url: attachmentUrl,
        show_in_ticker: showInTicker || false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    res.status(201).json(notice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
// @access  Private/Admin
const deleteNotice = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.notices.delete({
      where: { id: BigInt(id) },
    });
    res.json({ message: 'Notice removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get ticker notices
// @route   GET /api/notices/ticker
// @access  Public
const getTickerNotices = async (req, res) => {
  try {
    // Get settings to know max items
    const settings = await prisma.ticker_settings.findFirst();
    const limit = settings ? settings.max_items : 10;

    const notices = await prisma.notices.findMany({
      where: {
        show_in_ticker: true,
        // Optional: Add publish_date check if needed
        // publish_date: { lte: new Date() }
      },
      orderBy: { created_at: 'desc' },
      take: limit
    });

    // Transform BigInt to string for JSON serialization if needed, 
    // but usually Prisma handles this or we need a global interceptor.
    // For now, let's assume standard serialization works or we map it.
    const serializedNotices = notices.map(notice => ({
      ...notice,
      id: notice.id.toString(),
      created_by: notice.created_by ? notice.created_by.toString() : null
    }));

    res.json(serializedNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get ticker settings
// @route   GET /api/notices/ticker/settings
// @access  Public
const getTickerSettings = async (req, res) => {
  try {
    let settings = await prisma.ticker_settings.findFirst();

    if (!settings) {
      // Return defaults if no settings found
      return res.json({
        enabled: true,
        scrollSpeed: 'MEDIUM',
        maxItems: 10
      });
    }

    res.json({
      ...settings,
      id: settings.id.toString(),
      scrollSpeed: settings.scroll_speed,
      maxItems: settings.max_items
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update ticker settings
// @route   PUT /api/notices/ticker/settings
// @access  Private/Admin
const updateTickerSettings = async (req, res) => {
  const { enabled, scrollSpeed, maxItems } = req.body;

  try {
    // Check if settings exist
    const existingSettings = await prisma.ticker_settings.findFirst();

    let settings;
    if (existingSettings) {
      settings = await prisma.ticker_settings.update({
        where: { id: existingSettings.id },
        data: {
          enabled,
          scroll_speed: scrollSpeed,
          max_items: maxItems
        }
      });
    } else {
      settings = await prisma.ticker_settings.create({
        data: {
          enabled,
          scroll_speed: scrollSpeed,
          max_items: maxItems
        }
      });
    }

    res.json({
      ...settings,
      id: settings.id.toString(),
      scrollSpeed: settings.scroll_speed,
      maxItems: settings.max_items
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getNotices,
  createNotice,
  deleteNotice,
  getTickerNotices,
  getTickerSettings,
  updateTickerSettings
};
