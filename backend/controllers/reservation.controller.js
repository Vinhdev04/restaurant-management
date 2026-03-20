const Reservation = require('../models/Reservation.model');

// 1. Khách hàng gửi yêu cầu đặt bàn
const createReservation = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests, notes } = req.body;
        if (!name || !email || !phone || !date || !time || !guests) {
            return res.status(400).json({ message: "Vui lòng nhập đủ các trường thông tin!" });
        }

        const newReservation = new Reservation({
            guestName: name,
            email,
            phone,
            date,
            time,
            guests: Number(guests),
            notes
        });

        await newReservation.save();

        // Gửi thông báo đặt bàn Real-time
        const io = req.app.get('socketio');
        if (io) {
            io.emit('NOTIFICATION', {
                type: 'NEW_RESERVATION',
                message: `Khách hàng ${name} vừa đặt bàn cho ${guests} người vào lúc ${time} ngày ${date}!`,
                time: new Date()
            });
        }

        res.status(201).json({ message: "Đã gửi yêu cầu đặt bàn thành công!", reservation: newReservation });
    } catch (error) {
        console.error("Lỗi khi tạo đặt bàn:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 2. Lấy toàn bộ danh sách đặt bàn (Dành cho Admin/Manager)
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách đặt bàn" });
    }
};

// 3. Cập nhật trạng thái đặt bàn
const updateReservationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: "Trạng thái không hợp lệ!" });
        }

        await Reservation.findByIdAndUpdate(id, { status });
        res.status(200).json({ message: "Đã cập nhật trạng thái đặt bàn!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 4. Xóa đặt bàn
const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        await Reservation.findByIdAndDelete(id);
        res.status(200).json({ message: "Đã xóa đặt bàn!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

module.exports = {
    createReservation,
    getAllReservations,
    updateReservationStatus,
    deleteReservation
};
