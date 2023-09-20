import { createSlice } from '@reduxjs/toolkit';

export interface CommonState {
  code?: string;
  message?: string;
  isFetching?: boolean;
  isSuccess?: boolean;
  isFail?: boolean;
  uid?: string;
  grade?: number;
}

export const initialState: CommonState = {
  code: '',
  message: '',
  isFetching: false,
  isSuccess: false,
  isFail: false,
  uid: '',
  grade: undefined
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    handleCodeMessage(state: CommonState, action) {
      state.code = action.payload.code;
      state.message = action.payload.message;
    },
    handleLoaderTrue(state: CommonState) {
      state.isFetching = true;
    },
    handleLoaderFalse(state: CommonState) {
      state.isFetching = false;
    },
    handleSetUid(state: CommonState, action) {
      state.uid = action.payload.uid;
    },
    handleSetGrade(state: CommonState, action) {
      state.grade = action.payload.grade;
    }
  },
  // API 리듀서들 비동기 상태값들 한번에 관리하기 위한 extraReducers 모음
  extraReducers: {
    // ...add others
  }
});

export const {
  handleCodeMessage,
  handleLoaderTrue,
  handleLoaderFalse,
  handleSetUid,
  handleSetGrade
} = commonSlice.actions;

export default commonSlice.reducer;
