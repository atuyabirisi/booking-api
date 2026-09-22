class BookingRepository {
  async saveBooking(booking) {
    throw new Error("Method 'save()' must be implemented");
  }

  async findByBookingReference(bookingReference) {
    throw new Error("Method 'findByBookingReference()' must be implemented");
  }

  async isAvailable(propertyNumber, checkIn, checkOut) {
    throw new Error("Method 'isAvailable()' must be implemented");
  }

  async updateBooking(bookingReference, dataToUpdate) {
    throw new Error("Method 'updateBooking()' must be implemented");
  }
}

export default BookingRepository;
