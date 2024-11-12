let accounts = require("../../accounts");
const Accounts = require("../../models/Accounts");

exports.accountsList = async (req, res) => {
  // const { username } = req.query;
  try {
    const accounts = await Accounts.find();
    res.json(accounts);
    // const accounts = await Accounts.find(
    //   {
    //     username: { $regex: username ?? "", $options: "i" },
    //   },
    //   "createdAt",
    //   "updatedAt"
    // );
    // res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.accountCreate = (req, res) => {
//   const id = accounts[accounts.length - 1].id + 1;
//   const newAccount = { ...req.body, funds: 0, id };
//   accounts.push(newAccount);
//   res.status(201).json(newAccount);
// };

// exports.accountDelete = (req, res) => {
//   const { accountId } = req.params;
//   const foundAccount = accounts.find((account) => account.id === +accountId);
//   if (foundAccount) {
//     accounts = accounts.filter((account) => account.id !== +accountId);
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: "Account not found" });
//   }
// };

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;

  try {
    const foundAccount = await Accounts.findById(accountId);
    if (!foundAccount) res.status(404).json({ message: "Cat Not Found" });
    await foundAccount.deleteOne();
    res.status(200).json({ message: `account has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Accounts.findById(accountId);

    if (foundAccount) {
      await foundAccount.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // try {
  //   const foundAccount = await Accounts.findById(accountId);
  //   if (!foundAccount) res.status(404).json({ message: "Account not found" });

  //   const { username, funds } = req.body;

  //   foundAccount.username = username;
  //   foundAccount.funds = funds;

  //   await foundAccount.save()

  // } catch (error) {
  //   res.status(500).json({ message: "Account not found" });
  // }
  // res.status(200).json(foundAccount);
};

// exports.accountUpdate = (req, res) => {
//   const { accountId } = req.params;
//   const foundAccount = accounts.find((account) => account.id === +accountId);
//   if (foundAccount) {
//     foundAccount.funds = req.body.funds;
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: "Account not found" });
//   }
// };

exports.accountsGet = (req, res) => {
  res.json(accounts);
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
