class ReservationRepository {
  constructor({ Reservation, Chat, Board, sequelize }) {
    this.Reservation = Reservation;
    this.Chat = Chat;
    this.Board = Board;
    this.sequelize = sequelize;
  }

  async getReservation() {
    try {
      const result = await this.Reservation.findAll();
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async postReservation(data) {
    console.log(data)
    try {
      const [reservation, created] = await this.Reservation.findOrCreate({
        where: { boardid: data.boardid, email: data.email },
        defaults: data,
      });
      console.log(`reservation:::`, reservation)
      if (created) {
        console.log("New reservation created!");
      } else {
        console.log("Reservation already exists!");
        await reservation.update(data);
      }

      return reservation;
    } catch (e) {
      throw new Error(e);
    }
  }
  async findState(id) {
    try {
      const board = await this.Board.findOne({ where: { id: id } });
      return board.state;
    } catch (e) {
      throw new Error(e);
    }
  }
  async updateState(id, state) {
    try {
      let result = await this.Board.update(
        { state: state },
        { where: { id: id } }
      );
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ReservationRepository;
