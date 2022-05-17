import "../sass/myorders.scss";
import { Sidebar } from "../components/Sidebar";
import { Shadow } from "../components/Shadow";
import { formatPrice } from "../data/orderData";

type Props = {
  myorders: any;
  user: any;
  off: boolean;
  handleSwitch: () => void;
};

export function MyOrders({ myorders, off, user, handleSwitch }: Props) {
  function filterByUser(username: any, OrderArr: any[]) {
    const filteredArrayByUser = OrderArr.filter(
      (order: any) => order.user === username
    );
    console.log(filteredArrayByUser);
    return filteredArrayByUser;
  }

  return (
    <>
      {off && <Sidebar handleSwitch={handleSwitch} />}
      {off && <Shadow handleSwitch={handleSwitch} />}
      <div className="myorders__container">
        <h2>Orders History</h2>
        {filterByUser(user.username, myorders).map(
          (order: any, index: number) => {
            return (
              <div className="myorders__row" key={index + 1}>
                <div className="myorders__index">{index + 1}.</div>
                <div className="myorders__list">
                  <ul>
                    <li>OrderId: {order._id}</li>
                    <li> Price: {formatPrice(Number(order.price))} </li>
                    <li> TableNo.: {order.table} </li>
                    <li> Date: {order.date} </li>
                    <li> Time: {order.time} </li>
                    <li> Username: {order.user} </li>
                    <li> Date: {order.date} </li>
                    <h4>Order items</h4>
                    {order.orderquantity.map(function (
                      orderqty: any,
                      index: number
                    ) {
                      return (
                        <div key={index + 1}>
                          <li>
                            {orderqty.name} &times; {orderqty.quantity}
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
}
