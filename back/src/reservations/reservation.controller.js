class ReservationController {
  constructor({ reservationService }) {
    this.reservationService = reservationService;
  }

  async getReservation(req, res, next) {
    try {
      const result = await this.reservationService.getReservation();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async postReservation(req, res, next) {
    try {
      console.log(req.body)
      const result = await this.reservationService.postReservation(req.body)
      res.status(201).json(result)
    } catch (e) { 
      next(e)
    }
  }
}

module.exports = ReservationController;
