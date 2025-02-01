const { FAQ } = require("../../DB");

const deleteAllFAQ = async (req, res) => {
    const { id } = req.body;
  try {
    await FAQ.deleteMany({});

    return res.status(200).json({ msg: "All FAQ deleted" });
  } catch (error) {
    console.error(`Deleting All FAQ failed with error: ${error}`);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = deleteAllFAQ;
