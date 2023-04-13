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
      const result = await this.reservationService.postReservation(req.body)
      res.status(201).json(result)
    } catch (e) { 
      next(e)
    }
  }
  async getState(req, res, next) {
    try {
        const result = await this.reservationService.getState(req.params.id);
        console.log(result);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
}
async putState(req, res, next) {
    try {
        const result = await this.reservationService.putState(req.params.id, req.body);
        console.log(result);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
}
}

module.exports = ReservationController;
