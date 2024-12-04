import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit } from 'lucide-react';
import { isToday, addHours, set, isBefore } from 'date-fns';
import { useCartStore } from '@/store/cart/cartStore';
import { ServiceItem } from '@/types/service/service-item';

const getAvailableTimeSlots = (selectedDate: Date | undefined) => {
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

    if (!selectedDate || !isToday(selectedDate)) {
        return timeSlots;
    }

    const currentTime = new Date();
    const cutoffTime = addHours(currentTime, 6);

    return timeSlots.filter((slot) => {
        const [hour, minute, period] = slot.match(/(\d+):(\d+) (AM|PM)/)?.slice(1) || [];
        const slotHour = parseInt(hour) + (period === 'PM' && hour !== '12' ? 12 : 0);
        const slotDate = set(new Date(), {
            hours: slotHour,
            minutes: parseInt(minute),
            seconds: 0,
            milliseconds: 0,
        });

        return isBefore(cutoffTime, slotDate);
    });
};

interface EditBookingModalProps {
    cartItemId?: string;
    currentDate?: Date;
    currentTime?: string;
    item: ServiceItem;
}

const EditBookingModal: React.FC<EditBookingModalProps> = ({ cartItemId, currentDate, currentTime, item }) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(currentDate);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(currentTime);
    const { updateBookingInfo } = useCartStore();

    const handleUpdateBooking = async () => {
        if (!cartItemId || !selectedDate || !selectedTime) return;

        try {
            await updateBookingInfo(cartItemId, selectedDate, selectedTime);
        } catch (error) {
            console.error('Failed to update booking', error);
        }
    };

    const availableTimeSlots = getAvailableTimeSlots(selectedDate);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Edit date and time for <span className="capitalize">{item.title}</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="rounded-md border"
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Time Slot" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableTimeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                        {slot}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleUpdateBooking} disabled={!selectedDate || !selectedTime} className="w-full">
                        Update Booking
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookingModal;
