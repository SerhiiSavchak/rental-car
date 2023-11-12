export const getCars = state => state.cars.cars;
export const getCarResponse = state => state.cars.carResponse;
export const getCarsIsLoading = state => state.cars.isLoading;
export const getCurrentCar = state => state.cars.currentCar;

export const getFilter = state => state.filter;
export const getClientFilter = state => state.filter.client;
export const getServerFilter = state => state.filter.server.make;

export const getFavoriteCars = state => state.favorite.favorite;
