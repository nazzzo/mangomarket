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

    async postReservation() {
        try {
          const result = await this.reservationRepository.postReservation()
          return result
          } catch (e) {
            throw new Error()
          }        
    }
}
  
module.exports = ReservationService;