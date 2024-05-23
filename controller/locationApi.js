const createConnection = require("../config/connection");

const crateLocation = async (locationData) => {
  try {
    const { name, address, latitude, longitude } = locationData;

    if (latitude < -90 || latitude > 90) {
      throw new Error("invalid latitude ,must be provide -90 and 90");
    }
    if (longitude < -90 || longitude > 90) {
      throw new Error("invalid longitude ,must be provide -180 and 180");
    }

    let createQuery = `INSERT INTO locationDb (name,address,latitude, longitude )
    VALUES(?,?,?,?) `;

    let values = [name, address, latitude, longitude];
    let result = await createConnection.query(createQuery, values);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const findDistance = (lat1, lon1, lat2, lon2) => {
  console.log("🚀 ~ findDistance ~ (lat1, lon1, lat2, lon2:", (lat1, lon1, lat2, lon2))
  const toRadians = (value) => (value * Math.PI) / 180;
  let R = 6371;
  let dLat = toRadians(lat2 - lat1);
  let dLon = toRadians(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
};

const addLocation = async (req, res) => {
  try {
    let locationData = req.body;
    console.log("🚀 ~ addLocation ~ locationData:", locationData);
    const crateLocationData = await crateLocation(locationData);
    return res.status(200).json({
      success: true,
      message: "Location data add is successfully",
      data: crateLocationData,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};

const findLocation = async (req, res) => {
  try {
    let { latitude, longitude, radius } = req.query;
    console.log("🚀 ~ findLocation ~ req.query;:", req.query)
    if (latitude < -90 || latitude > 90) {
      throw new Error("invalid latitude ,must be provide -90 and 90");
    }
    if (longitude < -90 || longitude > 90) {
      throw new Error("invalid longitude ,must be provide -180 and 180");
    }
    if (!latitude || !longitude || !radius) {
      throw new Error("pass valid field");
    }

    let locationDataQuery = `SELECT * FROM locationDb`;
    let result = await createConnection.query(locationDataQuery);
    let finalData = result[0];
    let filterData = finalData.filter((data) => {
      let dataFind = findDistance(
        latitude,
        longitude,
        data.latitude,
        data.LONGITUDE
      );
      return dataFind <= radius;
    });
    return res.status(200).json({
      success: true,
      message: "Location data get  successfully",
      data: filterData,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addLocation, findLocation };
