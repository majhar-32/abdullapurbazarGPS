const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalStudents,
      totalTeachers,
      totalEvents,
      totalNotices,
      totalCommitteeMembers,
      todaysNotices
    ] = await Promise.all([
      prisma.students.count(),
      prisma.teachers.count(),
      prisma.events.count(),
      prisma.notices.count(),
      prisma.committee_members.count(),
      prisma.notices.findMany({
        where: {
          publish_date: {
            gte: today,
          },
        },
        orderBy: {
          publish_date: 'desc',
        },
        take: 5,
      }),
    ]);

    // Map Prisma field names to frontend expectations if necessary
    // Frontend expects camelCase, Prisma returns snake_case for fields like publish_date
    const formattedNotices = todaysNotices.map(notice => ({
      ...notice,
      publishDate: notice.publish_date,
      attachmentUrl: notice.attachment_url,
      isUrgent: notice.is_urgent,
      showInTicker: notice.show_in_ticker,
    }));

    res.json({
      totalStudents,
      totalTeachers,
      totalEvents,
      totalNotices,
      totalCommitteeMembers,
      todaysNotices: formattedNotices
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getDashboardStats };
