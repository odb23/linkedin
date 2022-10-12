import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

const mapStatetoProps = () => ({});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
