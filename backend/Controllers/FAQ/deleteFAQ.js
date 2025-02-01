const { FAQ } = require("../../DB");

const deleteFAQ = async (req, res) => {
    const { id } = req.body;
  try {
    await FAQ.deleteOne({_id : id});

    return res.status(200).json({ msg: "FAQ deleted" });
  } catch (error) {
    console.error(`Deleting FAQ failed with error: ${error}`);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = deleteFAQ;
