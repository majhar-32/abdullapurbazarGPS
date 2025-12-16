const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all pages
// @route   GET /api/pages
// @access  Public
const getPages = async (req, res) => {
  try {
    const pages = await prisma.page_contents.findMany({
      where: { is_visible: true },
    });
    res.json(pages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create or Update a page
// @route   POST /api/pages
// @access  Private/Admin
const savePage = async (req, res) => {
  const { pageKey, title, pdfUrl, isVisible } = req.body;

  try {
    // Check if page exists
    const existingPage = await prisma.page_contents.findUnique({
      where: { page_key: pageKey },
    });

    let page;
    if (existingPage) {
      // Update
      page = await prisma.page_contents.update({
        where: { page_key: pageKey },
        data: {
          title,
          pdf_url: pdfUrl,
          is_visible: isVisible !== undefined ? isVisible : true,
          updated_at: new Date(),
        },
      });
    } else {
      // Create
      page = await prisma.page_contents.create({
        data: {
          page_key: pageKey,
          title,
          pdf_url: pdfUrl,
          is_visible: isVisible !== undefined ? isVisible : true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }
    res.status(201).json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get a page by key
// @route   GET /api/pages/:pageKey
// @access  Public
const getPageByKey = async (req, res) => {
  const { pageKey } = req.params;
  try {
    const page = await prisma.page_contents.findUnique({
      where: { page_key: pageKey },
    });
    if (page && page.is_visible) {
      res.json(page);
    } else {
      res.status(404).json({ error: 'Page not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all pages (Admin - includes hidden)
// @route   GET /api/pages/all
// @access  Private/Admin
const getAllPages = async (req, res) => {
  try {
    const pages = await prisma.page_contents.findMany();
    res.json(pages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete a page
// @route   DELETE /api/pages/:id
// @access  Private/Admin
const deletePage = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.page_contents.delete({
      where: { id: BigInt(id) },
    });
    res.json({ message: 'Page removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getPages, savePage, getPageByKey, getAllPages, deletePage };
