class ReservationService {
    constructor({ reservationRepository }) {
        this.reservationRepository = reservationRepository;
    }

    async getReservation() {
        try {
            const result = await this.reservationRepository.getReservation();
            return result
        } catch (e) {
            throw new Error()
        }
    }

    async postReservation(data) {
        try {
            const result = await this.reservationRepository.postReservation(data)
            return result
        } catch (e) {
            throw new Error()
        }
    }
    async getState(id) {
        try {
            const result = await this.reservationRepository.findState(id);
            return result;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async putState(id, { state }) {
        try {
            const result = await this.reservationRepository.updateState(id, state);
            return result;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
}

module.exports = ReservationService;