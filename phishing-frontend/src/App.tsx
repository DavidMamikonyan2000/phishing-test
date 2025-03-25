import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "libraries/redux";
import { RoutesWrapper } from "libraries/router";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <RoutesWrapper />
    </Provider>
  </BrowserRouter>
);

export default App;
