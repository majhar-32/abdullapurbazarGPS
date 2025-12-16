const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Public
const getTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teachers.findMany({
      where: { is_visible: true },
      orderBy: { sort_order: 'asc' },
    });
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a teacher
// @route   POST /api/teachers
// @access  Private/Admin
const createTeacher = async (req, res) => {
  const { name, designation, phone, email, imageUrl, sortOrder, isVisible } = req.body;

  try {
    const teacher = await prisma.teachers.create({
      data: {
        name,
        designation,
        phone,
        email,
        image_url: imageUrl,
        sort_order: sortOrder || 0,
        is_visible: isVisible !== undefined ? isVisible : true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    res.status(201).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete a teacher
// @route   DELETE /api/teachers/:id
// @access  Private/Admin
const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.teachers.delete({
      where: { id: BigInt(id) },
    });
    res.json({ message: 'Teacher removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getTeachers, createTeacher, deleteTeacher };
