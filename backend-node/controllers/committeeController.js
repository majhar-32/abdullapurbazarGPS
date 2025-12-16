const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all committee members
// @route   GET /api/committee-members
// @access  Public
const getCommitteeMembers = async (req, res) => {
  try {
    const members = await prisma.committee_members.findMany({
      where: { is_visible: true },
      orderBy: { sort_order: 'asc' },
    });
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a committee member
// @route   POST /api/committee-members
// @access  Private/Admin
const createCommitteeMember = async (req, res) => {
  const { name, role, phone, email, imageUrl, sortOrder, isVisible } = req.body;

  try {
    const member = await prisma.committee_members.create({
      data: {
        name,
        role,
        phone,
        email,
        image_url: imageUrl,
        sort_order: sortOrder || 0,
        is_visible: isVisible !== undefined ? isVisible : true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete a committee member
// @route   DELETE /api/committee-members/:id
// @access  Private/Admin
const deleteCommitteeMember = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.committee_members.delete({
      where: { id: BigInt(id) },
    });
    res.json({ message: 'Committee member removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getCommitteeMembers, createCommitteeMember, deleteCommitteeMember };
