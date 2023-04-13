const {
    sequelize: {
      models: { Reservation, Board, Chat },
    },
    sequelize,
  } = require("../../models/index");
  
  const ReservationRepository = require("./reservation.repository");
  const ReservationService = require("./reservation.service");
  const ReservationController = require("./reservation.controller");
  
  const repository = new ReservationRepository({ Reservation, Board, Chat, sequelize });
  const service = new ReservationService({ reservationRepository: repository });
  const controller = new ReservationController({ reservationService: service });
  
  module.exports = {
    controller,
    repository
  }
  