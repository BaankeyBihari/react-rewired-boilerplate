import { createGlobalState } from "react-hooks-global-state";

const initialState = { count: 0 };
const { useGlobalState: useGlobalCountState } = createGlobalState(initialState);

export default useGlobalCountState;
