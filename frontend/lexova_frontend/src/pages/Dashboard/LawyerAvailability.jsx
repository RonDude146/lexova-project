import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LawyerDashboardLayout from '../../components/Dashboard/LawyerDashboardLayout';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Video,
  Phone,
  MapPin,
  Users
} from 'lucide-react';

const LawyerAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: [
      { id: 1, startTime: '09:00', endTime: '12:00', type: 'consultation', maxClients: 4 },
      { id: 2, startTime: '14:00', endTime: '17:00', type: 'consultation', maxClients: 6 }
    ],
    tuesday: [
      { id: 3, startTime: '10:00', endTime: '16:00', type: 'consultation', maxClients: 8 }
    ],
    wednesday: [
      { id: 4, startTime: '09:00', endTime: '12:00', type: 'court', maxClients: 1 },
      { id: 5, startTime: '14:00', endTime: '18:00', type: 'consultation', maxClients: 8 }
    ],
    thursday: [
      { id: 6, startTime: '09:00', endTime: '17:00', type: 'consultation', maxClients: 10 }
    ],
    friday: [
      { id: 7, startTime: '09:00', endTime: '15:00', type: 'consultation', maxClients: 8 }
    ],
    saturday: [],
    sunday: []
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-12-20',
      time: '10:00',
      duration: 60,
      client: 'John Doe',
      type: 'consultation',
      meetingType: 'video',
      status: 'confirmed',
      caseTitle: 'Personal Injury Claim',
      notes: 'Initial consultation for motor vehicle accident case'
    },
    {
      id: 2,
      date: '2024-12-20',
      time: '14:30',
      duration: 90,
      client: 'ABC Corporation',
      type: 'consultation',
      meetingType: 'in-person',
      status: 'confirmed',
      caseTitle: 'Contract Dispute',
      notes: 'Review contract terms and discuss settlement options'
    },
    {
      id: 3,
      date: '2024-12-22',
      time: '10:00',
      duration: 120,
      client: 'Court Hearing',
      type: 'court',
      meetingType: 'in-person',
      status: 'confirmed',
      caseTitle: 'Smith vs. Johnson',
      notes: 'Final hearing for employment discrimination case'
    },
    {
      id: 4,
      date: '2024-12-23',
      time: '15:00',
      duration: 60,
      client: 'Jane Smith',
      type: 'consultation',
      meetingType: 'phone',
      status: 'pending',
      caseTitle: 'Employment Discrimination',
      notes: 'Settlement negotiation discussion'
    }
  ]);

  const [timeOffRequests, setTimeOffRequests] = useState([
    {
      id: 1,
      startDate: '2024-12-25',
      endDate: '2024-12-27',
      reason: 'Holiday Break',
      status: 'approved',
      type: 'vacation'
    },
    {
      id: 2,
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      reason: 'Legal Conference',
      status: 'pending',
      type: 'professional'
    }
  ]);

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getAppointmentTypeColor = (type) => {
    switch (type) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800';
      case 'court':
        return 'bg-red-100 text-red-800';
      case 'meeting':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMeetingTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'in-person':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const todayAppointments = appointments.filter(apt => apt.date === selectedDate);
  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) > new Date()).slice(0, 5);

  return (
    <LawyerDashboardLayout 
      title="Availability Management" 
      subtitle="Manage your schedule, appointments, and time off"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold text-blue-600">{todayAppointments.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-green-600">{appointments.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Hours</p>
                  <p className="text-2xl font-bold text-purple-600">32</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilization Rate</p>
                  <p className="text-2xl font-bold text-orange-600">78%</p>
                </div>
                <div className="bg-orange-50 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList>
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="appointments">Appointments ({appointments.length})</TabsTrigger>
            <TabsTrigger value="timeoff">Time Off</TabsTrigger>
          </TabsList>

          {/* Weekly Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Weekly Availability</CardTitle>
                  <CardDescription>
                    Set your regular weekly schedule and availability
                  </CardDescription>
                </div>
                <Button onClick={() => setShowAddSlot(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Time Slot
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {daysOfWeek.map((day, index) => (
                    <div key={day} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="font-medium text-gray-900 mb-3">{dayLabels[index]}</h3>
                      {weeklySchedule[day].length > 0 ? (
                        <div className="space-y-2">
                          {weeklySchedule[day].map((slot) => (
                            <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {slot.startTime} - {slot.endTime}
                                </div>
                                <Badge className={getAppointmentTypeColor(slot.type)}>
                                  {slot.type}
                                </Badge>
                                <div className="text-sm text-gray-600">
                                  Max {slot.maxClients} clients
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => setEditingSlot(slot)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No availability set for this day</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add/Edit Time Slot Form */}
                {(showAddSlot || editingSlot) && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>{editingSlot ? 'Edit Time Slot' : 'Add New Time Slot'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="day">Day of Week</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                              <SelectContent>
                                {dayLabels.map((label, index) => (
                                  <SelectItem key={daysOfWeek[index]} value={daysOfWeek[index]}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="type">Appointment Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="consultation">Consultation</SelectItem>
                                <SelectItem value="court">Court Appearance</SelectItem>
                                <SelectItem value="meeting">Client Meeting</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startTime">Start Time</Label>
                            <Input
                              id="startTime"
                              type="time"
                              defaultValue={editingSlot?.startTime || '09:00'}
                            />
                          </div>
                          <div>
                            <Label htmlFor="endTime">End Time</Label>
                            <Input
                              id="endTime"
                              type="time"
                              defaultValue={editingSlot?.endTime || '17:00'}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="maxClients">Maximum Clients</Label>
                          <Input
                            id="maxClients"
                            type="number"
                            min="1"
                            max="20"
                            defaultValue={editingSlot?.maxClients || 4}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit">
                            <Save className="h-4 w-4 mr-2" />
                            {editingSlot ? 'Update Slot' : 'Add Slot'}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setShowAddSlot(false);
                              setEditingSlot(null);
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Today's Schedule</CardTitle>
                      <CardDescription>
                        {new Date(selectedDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </CardDescription>
                    </div>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-auto"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {todayAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {todayAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                          <div className="bg-blue-50 p-2 rounded-lg mr-4">
                            {getMeetingTypeIcon(appointment.meetingType)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{appointment.client}</h4>
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{appointment.caseTitle}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {appointment.time} ({appointment.duration} min)
                              </span>
                              <Badge variant="outline" className={getAppointmentTypeColor(appointment.type)}>
                                {appointment.type}
                              </Badge>
                              <span className="capitalize">{appointment.meetingType}</span>
                            </div>
                            {appointment.notes && (
                              <p className="text-xs text-gray-500 mt-2 italic">{appointment.notes}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {appointment.status === 'pending' && (
                              <Button size="sm">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments today</h3>
                      <p className="text-gray-600">You have a free day! Enjoy some time off or catch up on case work.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Next 5 scheduled meetings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm text-gray-900">{appointment.client}</h4>
                          <Badge className={getStatusColor(appointment.status)} size="sm">
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{appointment.caseTitle}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Time Off Tab */}
          <TabsContent value="timeoff" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Time Off Requests</CardTitle>
                  <CardDescription>
                    Manage your vacation days and time off
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Request Time Off
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeOffRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{request.reason}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {request.type}
                          </Badge>
                          <Badge className={request.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LawyerDashboardLayout>
  );
};

export default LawyerAvailability;

