const Customer = require("../model/customer");
const Vendor = require("../model/vendor");
const Follower = require("../model/followers")

// exports.followVendor = async (req, res) => {
//   const { customerId, vendorId } = req.body;

//   try {
//     const customer = await Customer.findById(customerId);
//     const vendor = await Vendor.findById(vendorId);

//     if (!customer || !vendor) {
//       return res.json({
//         status: 1,
//         message: "Customer or Vendor not found.",
//       });
//     }

//     if (!customer.followedVendors.includes(vendorId)) {
//       customer.followedVendors.push(vendorId);
//       vendor.followers.push(customerId);

//       await customer.save();
//       await vendor.save();

//       return res.json({
//         status: 0,
//         message: "Vendor followed successfully.",
//       });
//     } else {
//       return res.json({
//         status: 1,
//         message: "Already following this vendor.",
//       });
//     }
//   } catch (err) {
//     return res.json({
//       status: 1,
//       message: err.message,
//     });
//   }
// };

exports.followVendor = async (req, res) => {
  const { customerId, vendorId,followedAt } = req.body;


  try {
    const customer = await Customer.findById(customerId);
    const vendor = await Vendor.findById(vendorId);

    if (!customer || !vendor) {
      return res.json({
        status: 1,
        message: "Customer or Vendor not found.",
      });
    }

    const existingFollower = await Follower.findOne({ customer: customerId, vendor: vendorId });
    if (!existingFollower) {
      const newFollower = new Follower({ customer: customerId, vendor: vendorId,followedAt });
      await newFollower.save();

      customer.followedVendors.push(vendorId);
      vendor.followers.push(customerId);

      await customer.save();
      await vendor.save();

      return res.status(200).json({
        status: 0,
        message: "Vendor followed successfully.",
      });
    } else {
      return res.status(403).json({
        status: 1,
        message: "Already following this vendor.",
      });
    }
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: 1,
      message: err.message,
    });
  }
};

// exports.unfollowVendor = async (req, res) => {
//   const { customerId, vendorId } = req.body;

//   try {
//     const customer = await Customer.findById(customerId);
//     const vendor = await Vendor.findById(vendorId);

//     if (!customer || !vendor) {
//       return res.json({
//         status: 1,
//         message: "Customer or Vendor not found.",
//       });
//     }

//     if (customer.followedVendors.includes(vendorId)) {
//       customer.followedVendors = customer.followedVendors.filter(id => id.toString() !== vendorId);
//       vendor.followers = vendor.followers.filter(id => id.toString() !== customerId);

//       await customer.save();
//       await vendor.save();

//       return res.json({
//         status: 0,
//         message: "Vendor unfollowed successfully.",
//       });
//     } else {
//       return res.json({
//         status: 1,
//         message: "Not following this vendor.",
//       });
//     }
//   } catch (err) {
//     return res.json({
//       status: 1,
//       message: err.message,
//     });
//   }
// };
exports.unfollowVendor = async (req, res) => {
  const { customerId, vendorId } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    const vendor = await Vendor.findById(vendorId);

    if (!customer || !vendor) {
      return res.json({
        status: 1,
        message: "Customer or Vendor not found.",
      });
    }

    const existingFollower = await Follower.findOne({ customer: customerId, vendor: vendorId });
    if (existingFollower) {
      await existingFollower.remove();

      customer.followedVendors = customer.followedVendors.filter(id => id.toString() !== vendorId);
      vendor.followers = vendor.followers.filter(id => id.toString() !== customerId);

      await customer.save();
      await vendor.save();

      return res.json({
        status: 0,
        message: "Vendor unfollowed successfully.",
      });
    } else {
      return res.json({
        status: 1,
        message: "Not following this vendor.",
      });
    }
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};


// exports.getFollowers = async (req, res) => {
//   const { vendorId } = req.params;

//   try {
//     const vendor = await Vendor.findById(vendorId).populate('followers', 'firstname lastname email');
//     if (!vendor) {
//       return res.json({
//         status: 1,
//         message: "Vendor not found.",
//       });
//     }

//     return res.json({
//       status: 0,
//       followers: vendor.followers,
//     });
//   } catch (err) {
//     return res.json({
//       status: 1,
//       message: err.message,
//     });
//   }
// };

exports.getFollowers = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const followers = await Follower.find({ vendor: vendorId }).populate('customer', 'firstname lastname email');
    if (!followers) {
      return res.json({
        status: 1,
        message: "Vendor not found.",
      });
    }

    return res.json({
      status: 0,
      followers: followers.map(f => f.customer),
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};

