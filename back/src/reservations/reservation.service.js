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
}
  
module.exports = ReservationService;