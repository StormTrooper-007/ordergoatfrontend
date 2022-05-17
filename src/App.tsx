import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Tables } from "./pages/Tables";
import { Register } from "./pages/Register";
import { fetchOrders } from "./redux/actions/fetchOrderAction";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "./redux/store";
import RequireAuth from "./pages/RequireAuth";
import { useSwitch } from "./hooks/useSwitch";
import { useOpenOrder } from "./hooks/useOpenOrder";
import { useQuantity } from "./hooks/useQuantity";
import { useTableNumber } from "./hooks/useTableNumber";
import { useOrder } from "./hooks/useOrder";
import { MyOrders } from "./pages/MyOrders";
import { Admin } from "./pages/Admin";
import { EditUser } from "./pages/EditUser";
import { RequireAdminAuth } from "./pages/RequireAdminAuth";
import jwt_decode from "jwt-decode";

function App() {
  const off = useSwitch();
  const openOrder = useOpenOrder();
  const quantity = useQuantity();
  const tableNumber = useTableNumber();
  const [notes, setNotes] = useState<string>("");
  const orders = useOrder();

  const dispatch = useDispatch();
  const { myorders } = useSelector((state: rootState) => state.myorders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  let loggedInUser = localStorage.getItem("token");
  const user: any = loggedInUser && jwt_decode(loggedInUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar user={user} {...off} />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home
                  {...off}
                  {...openOrder}
                  {...quantity}
                  notes={notes}
                  setNotes={setNotes}
                  {...tableNumber}
                  {...orders}
                  user={user}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/tables"
            element={<Tables {...tableNumber} {...off} />}
          />
          <Route
            path="/myorders"
            element={<MyOrders myorders={myorders} user={user} {...off} />}
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <Admin {...off} />
            </RequireAdminAuth>
          }
        />
        <Route
          path="/edituser/:userId"
          element={<EditUser {...off} handleSwitch={off.handleSwitch} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
