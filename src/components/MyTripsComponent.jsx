import React from 'react';

const MyTripsComponent = ({ user, activeTab }) => {
  const filteredOrders = user?.orders?.filter(
    (order) => order.orderStatus.toLowerCase() === activeTab.toLowerCase()
  );

  function OrderStatus({ order }) {
    let statusText = '';
    let statusStyle = '';

    switch (order.orderStatus) {
      case 'Pending':
        statusText = 'Awaiting for payment';
        statusStyle = 'badge badge-warning';
        break;
      case 'Completed':
        statusText = 'Payment completed';
        statusStyle = 'badge badge-info';
        break;
      case 'Cancelled':
        statusText = 'Canceled';
        statusStyle = 'badge badge-error';
        break;
      default:
        statusText = 'Unknown'; // หรือข้อความอื่นๆ ตามต้องการ
        break;
    }

    return <p className={`py-1 px-2 rounded ${statusStyle}`}>{statusText}</p>;
  }

  return (
    <div>
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white mt-2 rounded-2xl shadow-md p-6 md:p-6 my-4"
          >
            <OrderStatus order={order} />
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600 font-bold ">
                Booking ID: {order.orderId}
              </p>
              <p className="text-gray-500 text-sm">
                จองเมื่อ{' '}
                {new Date(order.OrderDate).toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}{' '}
                {new Date(order.OrderDate).toLocaleTimeString('th-TH', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                น.
              </p>
            </div>

            {order.OrderItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between mb-4"
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-full rounded-xl"
                />

                <div className="w-full md:mx-4">
                  <p className="text-xl font-semibold mb-2 mx-2">
                    {item.title}
                  </p>
                  <div className="flex justify-between md:justify-center items-center py-4 px-12 md:gap-12">
                    <div className="flex-col flex items-center gap-2">
                      <p className="font-extrabold text-xl">{item.departure}</p>
                      <p className="font-bold bg-gray-200 rounded-full p-2">
                        {item.departureDate}
                      </p>
                    </div>
                    <div className="flex-col flex items-center gap-2">
                      <img src="/planeBlue.svg" alt="" />
                      <p className="font-semibold text-red-500">
                        {item.duration}
                      </p>
                    </div>
                    <div className="flex-col flex items-center gap-2">
                      <p className="font-extrabold text-xl">
                        {item.destination}
                      </p>
                      <p className="font-bold bg-gray-200 rounded-full p-2">
                        {item.arrivalDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-8 px-4 md:px-8">
                    <div className="flex items-center mb-4 md:mb-0">
                      <h2 className="text-2xl text-info p">
                        Number of Voyagers
                      </h2>
                      <div className="w-7 h-7 ml-2 mr-2 rounded-full bg-blue-500 text-white font-bold text-xl flex items-center justify-center">
                        {item.voyagerCount}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 md:gap-6 text-2xl md:text-3xl font-bold">
                      <p>Paid amount :</p>
                      <p className="text-gray-800">฿{order.OrderTotal}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <p className="text-gray-500 text-sm mt-4">
              We recommend you arrive at the airport at least 2 hours before
              departure to allow ample time for check-in.
            </p>
          </div>
        ))
      ) : (
        <p>No orders found for this status.</p>
      )}
    </div>
  );
};

export default MyTripsComponent;
