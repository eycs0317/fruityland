import { seedCoupons } from "@/utils/createCoupon";

export default function Test() {
  const data = seedCoupons()

    return (
        <div>
            <h1>Testing coupon generater</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data.map((coupon, index) => (
                <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                    <p>Code: {coupon.code}</p>
                    <p>Week: {coupon.week}</p>
                    <p>Start Date: {coupon.startDate}</p>
                    <p>End Date: {coupon.endDate}</p>
                    <p>Used: {coupon.used ? "Yes" : "No"}</p>
                </div>
            ))}
            </div>
          </div>
    )}
