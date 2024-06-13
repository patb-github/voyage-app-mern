export const allTrips = [
    {
        id: 1,
        imageSrc: '/destination/universal.jpg',
        title:
        'แพ็คเกจเที่ยว สิงคโปร์ Universal Studio Singapore รวม อาหาร และ ที่พัก',
        start_date: 'พฤ 9 พ.ค',
        end_date: 'อา 12 พ.ค.',
        destination_from: 'กรุงเทพ',
        destination_to: 'นิวยอร์ก',
        country: 'สหรัฐอเมริกา',
        rating: 4.7,
        num_reviews: 536,
        description: `แพ็คเกจเที่ยวนิวยอร์ก, สหรัฐอเมริกา 5 วัน 4 คืน รวมตั๋วเครื่องบิน ที่พัก 
        ร้านอาหาร และตั๋วเข้าเยี่ยมชมเทพีเสรีภาพ ชมละครบรอดเวย์ ละครเวทีระดับโลก 
        พร้อมบริการผู้ช่วยส่วนตัวตลอด 24 ชั่วโมง ตั้งแต่เริ่มต้นจนจบทริป สำหรับ 1 ท่าน`,
        price: 78150,
        subexpenses: [
            [`ตั๋วเครื่องบินไป-กลับ`, 35000],
            [`The Peninsula New York  5 วัน 4 คืน พร้อมอาหารเช้า`, 40700],
            [`ตั๋วเทพีเสรีภาพ`, 1700],
            [`บริการรับส่งจากสนามบิน และบริการผู้ช่วยส่วนตัว 24 ชม.`, 750],
        ]
    },
    {
        id: 2,
        imageSrc: '/destination/okinawaAquarium.jpg',
        title:
        'แพ็คเกจเที่ยวญี่ปุ่น โอกินาว่า พิพิธภัณฑ์สัตว์น้ำชุราอูมิ โอกินาว่าเวิลด์',
        start_date: 'พฤ 9 พ.ค',
        end_date: 'อา 12 พ.ค.',
        destination_from: 'กรุงเทพ',
        destination_to: 'โอโอะกินะวะ',
        country: 'ญี่ปุ่น',
        rating: 4.8,
        num_reviews: 857,
        description: `แพ็คเกจเที่ยว โอกินาว่า 4 วัน 3 คืน รวมตั๋วเครื่องบิน ที่พัก ร้านอาหาร และ 
          ตั๋วเข้าชมพิพิธภัณฑ์สัตว์น้ำชุราอูมิ  พร้อมบริการผู้ช่วยส่วนตัวตลอด
          24 ชั่วโมง ตั้งแต่เริ่มจนจบ ทริป สำหรับ 1 ท่าน <strong>อ่านเงื่อนไขเพิ่มเติมคลิก</strong>`,
        price: 29950,
        subexpenses: [
            [`ตั๋วเครื่องบิน ไป-กลับ`, 16500],
            [`Hilton Okinawa 3 คืน รวม อาหารเช้า`, 7500],
            [`บัตรทานอาหาร`, 4500],
            [`Okinawa Churaumi Aquarium`, 700],
            [`บริการรถรับส่งจากสนามบิน และ บริการผู้ช่วย`, 750]
        ]
    },
];

// returns the trip object with the same targetId
export function getTripById(arr, targetId) {
    for(let trip of arr) {
        if (trip.id === targetId) return trip;
    }
    return null;
}

// returns the trip object with the same targetName if it exists
export function getTripByName(arr, targetName) {
    for(let trip of arr) {
        if (trip.title === targetName) return trip;
    }
    return null;
}