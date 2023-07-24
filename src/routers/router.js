import express, { Router } from "express";
import { handlePromise, handlePromiseInsertion } from "./promiseHandler.js";
import allInsert from "../DAO/insertions.js";
import { getHotel } from "./get/get.hotel.js";
import {
  getAllRoomsByTypeAndHotelName
  , getAnaliseBeneficPromotion
  , getAverageResNumberDaysByHotel
  , getAverageResNumberMonthsByHotelAndYear
  , getBookingNumberByCustomer
  , getCollectedPayForAllHotelsByYear
  , getCurrentPrommotionsList
  , getCurrentlyOccupiedRoomsList
  , getCustomerListWithResCancelNumber
  , getCustomersListNotPaidFullFees
  , getCustomersNegCommentForHotel
  , getHotelAndNumberOfRooms
  , getHotelWithTheNumberRes
  , getHotelsListByProvince
  , getHotelsListContainsRoomByBeutures
  , getLeastMostReservedRoomByHotel
  , getOffersBySeasonAnDHotel
  , getPayementListAllInfo
  , getReceptionistsListInWhichHotel
  , getResNumberByCustomerAndPeriod
  , getReservationListDescByHotel
  , getReservationOfGivenCustomer
  , getRoomsByMultipleCriteria
  , getRoomsDetailsByOccupedGivenGuest
  , getRoomsListAvailableTommorow
  , getRoomsListByDescPrice
  , getRoomsListByFeatures
  , getRoomsListByPriceInterval
  , getTotalConferencePaymentInIntervalDate
  , getTotalPayForRoomsHotel
  , getTotalPayReceidByGivenMethod
  , getTotalResForHotel
  , getTotalResNumberByRoomType
}
  from "../DAO/displays.js";


export const router = express.Router();


// EASY-LINES:
// --------------------------------------------------------------------------------
router.get("/ReceptionistsListInWhichHotel", getHotel);


// easy-line3:
// DISPLAY THE LIST OF RESERVATIONS STARTING WITH THE MOST RECENT FOR A GIVEN HOTEL
router.get("/ReservationListDescByHotel", (req, res) => {
  // FOR TEST: http://localhost:8000/ReservationListDescByHotel

  const hotel_name = "Mountain View Hotel";
  // const hotel_name = req.body;
  handlePromise(getReservationListDescByHotel({ hotel_name }), res);
});

// easy-line4:
// LIST OF ROOM TYPE GIVE AND HOTEL GIVE
router.get("/AllRoomsByTypeAndHotelName", (req, res) => {
  // FOR TEST: http://localhost:8000/AllRoomsByTypeAndHotelName
  const room_type = "double";
  const hotel_id = 80;
  // const {room_type, hotel_id} = req.body;
  handlePromise(getAllRoomsByTypeAndHotelName({ room_type, hotel_id }), res);
});

// easy-line5:
// DISPLAY SPECIAL OFFERS BY SEASON (PERIOD), ALL HOTEL COMBINED
router.get("/OffersBySeasonAnDHotel", (req, res) => {
  //FOR TEST: http://localhost:8000/OffersBySeasonAnDHotel
  handlePromise(getOffersBySeasonAnDHotel(), res);
})


// easy-line6:
// LIST OF RESERVATIONS OF A GIVEN CLIENT
router.get("/ReservationOfGivenCustomer", (req, res) => {
  // FOR TEST: http://localhost:8000/ReservationOfGivenCustomer
  // const customer_id = req.body;
  const customer_id = 79;
  handlePromise(getReservationOfGivenCustomer({ customer_id }), res);
});


// easy-line7:
// VIEW THE LIST OF CUSTOMERS WHO HAVE NOT YET PAID THEIR FEES IN FULL
router.get("/CustomersListNotPaidFullFees", (req, res) => {
  // FOR TEST: http://localhost:8000/CustomersListNotPaidFullFees
  handlePromise(getCustomersListNotPaidFullFees(), res);
});


// easy-line8:
// TOTAL PAYMENTS RECEIVED BY MOBILE MONEY  
// GENERALISE::::::::::::::
router.get("/TotalPayReceidByGivenMethod", (req, res) => {
  // FOR TEST: http://localhost:8000/TotalPayReceidByGivenMethod
  handlePromise(getTotalPayReceidByGivenMethod(), res);
});


// easy-line9:
// DISPLAY THE NUMBER OF RESERVATIONS MADE BY A GIVEN CUSTOMER DURING A GINVEN PERIOD
router.get("/ResNumberByCustomerAndPeriod", (req, res) => {
  // FOR TEST: http://localhost:8000/ResNumberByCustomerAndPeriod
  const customer_name = "Mason";
  const period = "2023-07-15 10:00:00";
  // const {customer_name, period} = req.body;
  handlePromise(getResNumberByCustomerAndPeriod({ customer_name, period }), res);
});


// easy-line10:
// DISPLAY THE LIST OF HOTELS IN A GIVEN LOCATION (PROVINCE)
router.get("/HotelsListByProvince", (req, res) => {
  // FOR TEST: http://localhost:8000/HotelsListByProvince
  // const {provice} = req.body;
  const province = "Antananarivo";
  handlePromise(getHotelsListByProvince({ province }), res);
});


// easy-line11:
// DISPLAY THE LIST OF ROOMS THAT CORRESPOND TO A PRICE RANGE GIVEN BY THE CUSTOMER 
router.get("/RoomsListByPriceInterval", (req, res) => {
  // FOR TEST: http://localhost:8000/RoomsListByPriceInterval
  // const {min_price, max_price} = req.body;
  const min_price = 12100;
  const max_price = 12200;
  handlePromise(getRoomsListByPriceInterval({ min_price, max_price }), res);
});

// easy-line12:
// DESPLAY ALL ROOM ORDER BY PRICE DESC:
router.get("/RoomsListByDescPrice", (req, res) => {
  // FOR TEST: http://localhost:8000/RoomsListByDescPrice
  handlePromise(getRoomsListByDescPrice(), res);
});


// easy-line13:
// DISPLAY A LIST OF ROOMS WHOSE DESCRIPTIONS MATCH SPECIFUIC KEYWORDS
router.get("/RoomsListByFeatures", (req, res) => {
  // FOR TEST: http://localhost:8000/RoomsListByFeatures
  let keyword = "VIP";
  // let keyword = req.body;
  handlePromise(getRoomsListByFeatures({ keyword }), res);
});

// easy-line14:
// DISPLAY THE LIST PF HOTELS THAT CONTAIN ROOMS
// WHOSE DESCRIPTION CORRESPONDS TO GIVEN KEYWORD
router.get("/HotelsListContainsRoomByBeutures", (req, res) => {
  //FOR TEST: http://localhost:8000/HotelsListContainsRoomByBeutures
  let keyword = "VIP";
  // let keyword = req.body;
  handlePromise(getHotelsListContainsRoomByBeutures({ keyword }), res);
});


// easy-line15:
// DISPLAY DETAILS OF THE ROOM CURRENTLY OCCUPID BY A GIVEN GUEST
router.get("/RoomsDetailsByOccupedGivenGuest", (req, res) => {
  //FOR TEST: http://localhost:8000/RoomsDetailsByOccupedGivenGuest
  let customer_name = "William";
  let customer_id = 78;
  // let {customer_name, customer_id} = req.body;
  handlePromise(getRoomsDetailsByOccupedGivenGuest({ customer_name, customer_id }), res);
});


// easy-line16/17:
// GENERALISE::::::::
// SHOW THE HOTEL WITH THE MOST RESERVATIONS
router.get("/HotelWithTheNumberRes", (req, res) => {
  // FOR TEST: http://localhost:8000/HotelWithTheNumberRes
  handlePromise(getHotelWithTheNumberRes(), res);
});


// easy-line18:
// SHOW THE CUSTOMERS WITH THE MOST NEGATIVE REVIEWS WRITTEN FOR HOTELS
router.get("/CustomersNegCommentForHotel", (req, res) => {
  // FOR TEST: http://localhost:8000/CustomersNegCommentForHotel
  handlePromise(getCustomersNegCommentForHotel(), res);
});


// MEDIUM-LINES:
// --------------------------------------------------------------------------------------------------------------------
// medium-line2:
// SHOW HOW MANY TIMES A CUSTOMER HAS BOOKED IN OUR HOTEL
router.get("/BookingNumberByCustomer", (req, res) => {
  // FOR TEST: http://localhost:8000/BookingNumberByCustomer
  const customer_id = 45;
  // const customer_id = req.body;
  handlePromise(getBookingNumberByCustomer({ customer_id }), res);

});



// Medium-line3:
// DISPLAY THE LIST OF ROOMS AVAILABLE TOMORROW
router.get("/RoomsListAvailableTommorow", (req, res) => {
  // FOR TEST: http://localhost:8000/RoomsListAvailableTommorow
  handlePromise(getRoomsListAvailableTommorow(), res);
});

// medium-line4:
// DISPLAY THE TOTAL NUMBER OF RESERVATIONS BY ROOM TYPE
router.get("/TotalResNumberByRoomType", (req, res) => {
  // FOR TEST: http://localhost:8000/TotalResNumberByRoomType
  handlePromise(getTotalResNumberByRoomType(), res);
});

// medium-line5:
// LIST OF ROOMS THAT MEET MULTIPLE CRITERIA
router.get("/RoomsByMultipleCriteria", (req, res) => {
  // FOR TEST: http://localhost:8000/RoomsByMultipleCriteria
  const criteria = {
    sea_view: true,
    vip_category: true,
    hot_water: true,
    wifi_available: false,
    room_service: true,
    mini_bar: true,
    flat_screen: false,
  };
  // const criteria = req.body;
  handlePromise(getRoomsByMultipleCriteria(criteria), res);
});


// medium-line6:
// SHOW THE TOTAL NUMBER OF RESERVATIONS PER HOTEL
router.get("/TotalResForHotel", (req, res) => {
  // FOR TEST: http://localhost:8000/TotalResForHotel
  handlePromise(getTotalResForHotel(), res);
});


// medium-line7:
// CUSTOMER LIST WITH RESERVATION CANCELLATION NUMBER
router.get("/CustomerListWithResCancelNumber", (req, res) => {
  // FOR TEST: http://localhost:8000/CustomerListWithResCancelNumber
  handlePromise(getCustomerListWithResCancelNumber(), res);
});


// medium-line8:
// DISPLAY HOTEL WITH ROOMS NUMBRER BY HOTEL
router.get("/HotelAndNumberOfRooms", (req, res) => {
  // for test: http://localhost:8000/HotelAndNumberOfRooms
  handlePromise(getHotelAndNumberOfRooms(), res);
});



// medium-line9:
// SHOW LIST OF CURENTLY OCCUPIED ROOMS:
router.get("/CurrentyOccupiedRoomsList", (req, res) => {
  // FOR TEST: http://localhost:8000/CurrentyOccupiedRoomsList
  handlePromise(getCurrentlyOccupiedRoomsList(), res);
});


// medium-line10-11:
// DISPLAY LEAST/MOST RESERVED ROOM IN GIVEN HOTEL
router.get("/LeastMostReservedRoomByHotel", (req, res) => {
  // FOR TEST: http://localhost:8000/LeastMostReservedRoomByHotel
  let hotel_name = "Tranquil Bay Resort";
  // const hotel_name = req.body;
  handlePromise(getLeastMostReservedRoomByHotel(hotel_name), res);
});


// medium-line12:
// DISPLAY THE LIST OF CURRENT PROMOTIONS: 
router.get("/CurrentPrommotionsList", (req, res) => {
  // FOR TEST: http://localhost:8000/CurrentPrommotionsList
  handlePromise(getCurrentPrommotionsList(), res);
});

// medium-line14:
// DISPLAY LIST OF PAYMENT WITH NAME AND FIRST-NAME WHO WAS RECEIVE IT:
router.get("/PayementListAllInfo", (req, res) => {
  // FOR TEST: http://localhost:8000/PayementListAllInfo
  handlePromise(getPayementListAllInfo(), res);
});

// HARD-LINES:
// ------------------------------------------------------------------------------------------------------------------------------
// hard-line5:
// TOTAL PAYMENTS COLLECTED IN A YE:AR FOR EACH HOTEL
router.get("/CollectedPayForAllHotelsByYear", (req, res) => {
  // FOR TEST: http://localhost:8000/CollectedPayForAllHotelsByYear
  const year = '2023';
  // const year = '2023';
  handlePromise(getCollectedPayForAllHotelsByYear({ year }), res);
});


// hard-line6:
// DISPLAY TOTAL  OF PAYMANT ONLY FOR ROOM'S RESERVATIONS
// IN A GIVEN DATE INTERVAL

router.get("/TotalPayForRoomsHotel", (req, res) => {
  // FOR TEST: http://localhost:8000/TotalPayForRoomsHotel
  const start_period = "2000-08-01";
  const end_period = "2025-12-30";
  // const { start_period, end_period } = req.params;
  handlePromise(getTotalPayForRoomsHotel({ start_period, end_period }), res);
});



// hard-line7:
// DISPLAY TOTAL  OF PAYMANT ONLY FOR CONFERENCES ROOM'S RESERVATIONS
// IN A GIVEN DATE INTERVAL
router.get("/TotalConferencePaymentInIntervalDate", (req, res) => {
  // FOR TEST: http://localhost:8000/TotalConferencePaymentInIntervalDate
  const start_period = "2000-08-01";
  const end_period = "2025-12-30";
  const room_type = "communicante";
  // const { start_period, end_period, room_type } = req.body;
  handlePromise(getTotalConferencePaymentInIntervalDate({ start_period, end_period, room_type }), res);
});


// hard-line9:
// FOR EACH PROMOTION, DISPLAY THE TOTAL NUMBER OF RESERVATIONS THAT BENEFITED FROM THE PROMOTION, BY HOTEL
// (TO KNOW IF IT WORKED OR NOT)
router.get("/AnaliseBeneficPromotion", (req, res) => {
  // FOR TEST: http://localhost:8000/AnaliseBeneficPromotion
  handlePromise(getAnaliseBeneficPromotion(), res);
});


// hard-line12:
// DISPLAY THE AVERAGE NUMBER OF RESERVATIONS PER HOTEL FOR EACH MONTH OF A GIVEN YEAR 
router.get("/AverageResNumberMonthsByHotelAndYear", (req, res) => {
  // FOR TEST: http://localhost:8000/AverageResNumberMonthsByHotelAndYear
  const year = "2023";
  // const year = req.body;
  handlePromise(getAverageResNumberMonthsByHotelAndYear({year}), res);
});


// hard-line13:
// DISPLAY AVERAGE NUMBER OF RESERVATIONS PER HOTEL, PER DAY, ALL PERIODS COMBINED
router.get("/AverageResNumberDaysByHotel", (req, res) => {
  // FOR TEST: http://localhost:8000/AverageResNumberDaysByHotel
  handlePromise(getAverageResNumberDaysByHotel(), res);
});

// Insertion for new province
router.post("/province", (req, res) => {
  // FOR TEST: http://localhost:8000/province
  const data =  req.body;
  handlePromiseInsertion(allInsert.addProvinceAvailable(data), res)
});