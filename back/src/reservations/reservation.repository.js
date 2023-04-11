class ReservationRepository {
  constructor({ Reservation, Chat, Board, sequelize }) {
    this.Reservation = Reservation;
    this.Chat = Chat;
    this.Board = Board;
    this.sequelize = sequelize;
  }

  async getReservation(){
    try {
      const result = await this.Reservation.findAll()
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  async postReservation() {
    try {
      const result = await this.Reservation.create();
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ReservationRepository;
