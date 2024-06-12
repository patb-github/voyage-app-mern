import React from 'react';

function CartItemUi({
  id,
  title,
  imageSrc,
  departure,
  departureDate,
  destination,
  arrivalDate,
  duration,
  voyagerCount,
  total,
  onDelete,
}) {
  return (
    <div className="card bg-base-100 shadow-xl my-4">
      <div className="card-body">
        <div className="card-title justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          <div className="card-actions">
            <button className="btn btn-outline btn-info btn-xs">แก้ไข</button>
            <button
              className="btn btn-error btn-xs"
              onClick={() => onDelete(id)}
            >
              ลบ
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex items-center mb-4 md:mb-0">
            <input
              type="checkbox"
              className="checkbox checkbox-primary mr-2 f;"
              defaultChecked
            />
            <img
              src={imageSrc}
              alt={title}
              className="rounded-3xl hidden md:block w-64"
            />
          </div>

          <div className="flex-grow">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8 py-4 px-4 md:px-8">
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg">{departure}</p>
                <p className="badge badge-ghost p-4">{departureDate}</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/planeBlue.svg" alt="Plane" />
                <p className="text-error">{duration}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg">{destination}</p>
                <p className="badge badge-ghost p-4">{arrivalDate}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-8 px-4 md:px-8">
              <div className="flex items-center mb-4 md:mb-0">
                <h2 className="text-2xl text-info">
                  จำนวน Voyager
                  <div className="badge badge-info text-white h-7 w-7 ml-2">
                    {voyagerCount}
                  </div>
                </h2>
              </div>

              <div className="flex items-baseline gap-2 md:gap-6 text-2xl md:text-3xl font-bold">
                <p>ยอดรวม</p>
                <p className="text-gray-800">{total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemUi;
