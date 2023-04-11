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

  async postReservation(data) {
    try {
      const [reservation, created] = await this.Reservation.findOrCreate({
        where: { boardid: data.boardid, email: data.email },
        defaults: data,
      });
  
      if (created) {
        console.log('New reservation created!');
      } else {
        console.log('Reservation already exists!');
        await reservation.update(data);
      }
  
      return reservation;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ReservationRepository;
