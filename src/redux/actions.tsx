export const ADD_DATA = 'ADD_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const DELETE_DATA = 'DELETE_DATA';

export const addData = (data: any) => ({
  type: ADD_DATA,
  payload: data,
});

export const updateData = (id: number, updatedData: any) => ({
  type: UPDATE_DATA,
  payload: { id, updatedData },
});

export const deleteData = (id: number) => ({
  type: DELETE_DATA,
  payload: id,
});
