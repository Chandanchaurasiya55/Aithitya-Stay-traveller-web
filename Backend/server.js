import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './Src/db.js';
import { Enquiry } from './Src/models/Enquiry.js';
import { Package } from './Src/models/Package.js';
import { Hotel } from './Src/models/Hotel.js';
import { Post } from './Src/models/Post.js';

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// In-Memory Fallback Stores (if DB connection fails)
let memoryEnquiries = [
  {
    id: 'enq-1',
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
    email: 'rahul.sharma@example.com',
    destination: 'Nainital',
    service: 'Nainital Family Getaway',
    guests: '4 Guests, 2 Rooms',
    date: '2026-08-10',
    notes: 'Looking for lake view rooms and transport included.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'enq-2',
    name: 'Priya Singh',
    phone: '+91 9123456789',
    email: 'priya.singh@gmail.com',
    destination: 'Jim Corbett',
    service: 'Destination Weddings',
    guests: '150 Guests',
    date: '2026-11-20',
    notes: 'Destination wedding venue inquiry for 3 days.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

let memoryPackages = [
  {
    id: 'pkg-1',
    title: 'Nainital Family Getaway',
    subtitle: 'Lakes, Mountains & Serenity',
    duration: '2 Nights / 3 Days',
    category: 'Family Tours',
    badge: 'Best Seller',
    badgeColor: 'bg-red-600',
    price: '6,999',
    priceUnit: 'person',
    rating: '4.9 (120 Reviews)',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    specs: ['Hotel', 'Sightseeing', 'Breakfast', 'Taxi'],
    highlights: [
      'Handpicked 3-Star & 4-Star mountain view luxury stays',
      'Private dedicated vehicle with experienced local driver',
      'Boating at Naini Lake & ropeway ride',
      'Zero hidden charges & 100% price guarantee'
    ]
  },
  {
    id: 'pkg-2',
    title: 'Jim Corbett Wildlife Tour',
    subtitle: 'Adventure in the Lap of Nature',
    duration: '3 Nights / 4 Days',
    category: 'Adventure',
    badge: 'Popular',
    badgeColor: 'bg-[#0F382C]',
    price: '13,999',
    priceUnit: 'person',
    rating: '4.8 (210 Reviews)',
    image: '/corbett_tiger.png',
    specs: ['Hotel', 'Meals', 'Safari', 'Transport'],
    highlights: [
      'Jeep Safari inside Jim Corbett National Park core zone',
      'Stay at luxury riverside jungle resort',
      'Bonfire and live acoustic music evening',
      'All meals included with local Kumaoni delicacies'
    ]
  },
  {
    id: 'pkg-3',
    title: 'Chardham Yatra Package',
    subtitle: 'Spiritual Journey to the Abode of Gods',
    duration: '9 Nights / 10 Days',
    category: 'Spiritual Tours',
    badge: 'Trending',
    badgeColor: 'bg-amber-600',
    price: '28,999',
    priceUnit: 'person',
    rating: '4.9 (340 Reviews)',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
    specs: ['Hotel', 'Meals', 'Guide', 'Transport'],
    highlights: [
      'Complete VIP Darshan assistance at Yamunotri, Gangotri, Kedarnath & Badrinath',
      'Comfortable AC tempo traveller transfer',
      'Special medical assistance & emergency support',
      'Experienced tour leader throughout the pilgrimage'
    ]
  }
];

let memoryHotels = [
  {
    id: 'htl-1',
    name: 'Corbett Fun Resort',
    location: 'Jim Corbett, Uttarakhand',
    dest: 'Jim Corbett',
    rating: '4.8 (750 Reviews)',
    price: '5,499',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tag: 'Luxury Jungle Resort',
    amenities: ['Pool', 'Restaurant', 'WiFi', 'Parking', 'Spa', 'Jungle View']
  },
  {
    id: 'htl-2',
    name: 'Nainital Lakeview Palace & Resort',
    location: 'Mall Road, Nainital',
    dest: 'Nainital',
    rating: '4.9 (520 Reviews)',
    price: '6,299',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    tag: 'Heritage Lake View',
    amenities: ['Lake View', 'Restaurant', 'WiFi', 'Heater', 'Room Service']
  },
  {
    id: 'htl-3',
    name: 'Mussoorie Hilltop Spa & Resort',
    location: 'Library Bazaar, Mussoorie',
    dest: 'Mussoorie',
    rating: '4.7 (410 Reviews)',
    price: '7,499',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    tag: 'Mountain Panorama',
    amenities: ['Spa', 'Infinity Pool', 'WiFi', 'Bonfire', 'Valley View']
  }
];

let memoryPosts = [
  {
    id: 'post-1',
    page: 'destinations',
    title: 'Kainchi Dham Ashram',
    subtitle: 'Spiritual Retreat & Neem Karoli Baba Temple',
    image: '/kainchi_dham.png',
    description: 'A world-famous spiritual sanctuary located near Bhowali in Uttarakhand, attracting seekers from across the globe.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'post-2',
    page: 'weddings',
    title: 'Bhimtal Lakefront Mandap',
    subtitle: 'Exclusive Water Pier Wedding Venue',
    image: '/wedding_hero.png',
    description: 'Say your vows under flower-adorned mandaps over serene waters surrounded by misty Himalayan hills.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'post-3',
    page: 'corporate',
    title: 'Corbett Jungle Leadership Retreat',
    subtitle: 'Executive Team Outing & Strategy Meet',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    description: 'Transformative corporate retreats featuring team building games, jungle safaris, and luxury conference facilities.',
    createdAt: new Date().toISOString()
  }
];

let isDBConnected = false;

// Function to seed database if empty
const seedDatabaseIfEmpty = async () => {
  try {
    const enqCount = await Enquiry.countDocuments();
    if (enqCount === 0) {
      await Enquiry.insertMany(memoryEnquiries.map(({ id, ...rest }) => rest));
      console.log('🌱 Seeded Initial Enquiries into MongoDB');
    }

    const pkgCount = await Package.countDocuments();
    if (pkgCount === 0) {
      await Package.insertMany(memoryPackages.map(({ id, ...rest }) => rest));
      console.log('🌱 Seeded Initial Packages into MongoDB');
    }

    const htlCount = await Hotel.countDocuments();
    if (htlCount === 0) {
      await Hotel.insertMany(memoryHotels.map(({ id, ...rest }) => rest));
      console.log('🌱 Seeded Initial Hotels into MongoDB');
    }

    const postCount = await Post.countDocuments();
    if (postCount === 0) {
      await Post.insertMany(memoryPosts.map(({ id, ...rest }) => rest));
      console.log('🌱 Seeded Initial Posts into MongoDB');
    }
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
};

// --- ENQUIRIES API ---
app.get('/api/enquiries', async (req, res) => {
  if (isDBConnected) {
    try {
      const data = await Enquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: data.length, data });
    } catch (err) {
      console.error(err);
    }
  }
  res.json({ success: true, count: memoryEnquiries.length, data: memoryEnquiries });
});

app.post('/api/enquiries', async (req, res) => {
  if (isDBConnected) {
    try {
      const newEnq = new Enquiry({
        name: req.body.name || 'Guest',
        phone: req.body.phone || '',
        email: req.body.email || '',
        destination: req.body.destination || 'Uttarakhand',
        service: req.body.service || 'General Enquiry',
        guests: req.body.guests || '2 Guests',
        date: req.body.date || new Date().toISOString().split('T')[0],
        notes: req.body.notes || '',
        status: 'Pending'
      });
      const saved = await newEnq.save();
      return res.status(201).json({ success: true, data: saved });
    } catch (err) {
      console.error(err);
    }
  }

  const fallbackEnq = {
    id: 'enq-' + Date.now(),
    name: req.body.name || 'Guest',
    phone: req.body.phone || '',
    email: req.body.email || '',
    destination: req.body.destination || 'Uttarakhand',
    service: req.body.service || 'General Enquiry',
    guests: req.body.guests || '2 Guests',
    date: req.body.date || new Date().toISOString().split('T')[0],
    notes: req.body.notes || '',
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  memoryEnquiries.unshift(fallbackEnq);
  res.status(201).json({ success: true, data: fallbackEnq });
});

app.put('/api/enquiries/:id', async (req, res) => {
  const { id } = req.params;
  if (isDBConnected) {
    try {
      const updated = await Enquiry.findByIdAndUpdate(
        id,
        { status: req.body.status },
        { new: true }
      );
      if (updated) return res.json({ success: true, data: updated });
    } catch (err) {
      console.error(err);
    }
  }

  const index = memoryEnquiries.findIndex(e => e.id === id);
  if (index !== -1) {
    memoryEnquiries[index].status = req.body.status || memoryEnquiries[index].status;
    res.json({ success: true, data: memoryEnquiries[index] });
  } else {
    res.status(404).json({ success: false, message: 'Enquiry not found' });
  }
});

app.delete('/api/enquiries/:id', async (req, res) => {
  const { id } = req.params;
  if (isDBConnected) {
    try {
      await Enquiry.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Enquiry deleted successfully' });
    } catch (err) {
      console.error(err);
    }
  }

  memoryEnquiries = memoryEnquiries.filter(e => e.id !== id);
  res.json({ success: true, message: 'Enquiry deleted successfully' });
});

// --- PACKAGES API ---
app.get('/api/packages', async (req, res) => {
  if (isDBConnected) {
    try {
      const data = await Package.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: data.length, data });
    } catch (err) {
      console.error(err);
    }
  }
  res.json({ success: true, count: memoryPackages.length, data: memoryPackages });
});

app.post('/api/packages', async (req, res) => {
  if (isDBConnected) {
    try {
      const newPkg = new Package({
        title: req.body.title,
        subtitle: req.body.subtitle || 'Custom Package',
        duration: req.body.duration || '3 Nights / 4 Days',
        category: req.body.category || 'Family Tours',
        badge: req.body.badge || 'Popular',
        badgeColor: req.body.badgeColor || 'bg-[#0F382C]',
        price: req.body.price || '9,999',
        priceUnit: req.body.priceUnit || 'person',
        rating: req.body.rating || '5.0 (New)',
        image: req.body.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
        specs: req.body.specs || ['Hotel', 'Meals', 'Taxi'],
        highlights: req.body.highlights || ['Handpicked luxury stay', 'Private vehicle transfer', 'Zero hidden charges']
      });
      const saved = await newPkg.save();
      return res.status(201).json({ success: true, data: saved });
    } catch (err) {
      console.error(err);
    }
  }

  const fallbackPkg = {
    id: 'pkg-' + Date.now(),
    title: req.body.title,
    subtitle: req.body.subtitle || 'Custom Package',
    duration: req.body.duration || '3 Nights / 4 Days',
    category: req.body.category || 'Family Tours',
    badge: req.body.badge || 'Popular',
    badgeColor: req.body.badgeColor || 'bg-[#0F382C]',
    price: req.body.price || '9,999',
    priceUnit: req.body.priceUnit || 'person',
    rating: req.body.rating || '5.0 (New)',
    image: req.body.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    specs: req.body.specs || ['Hotel', 'Meals', 'Taxi'],
    highlights: req.body.highlights || ['Handpicked luxury stay', 'Private vehicle transfer', 'Zero hidden charges']
  };
  memoryPackages.unshift(fallbackPkg);
  res.status(201).json({ success: true, data: fallbackPkg });
});

app.delete('/api/packages/:id', async (req, res) => {
  const { id } = req.params;
  if (isDBConnected) {
    try {
      await Package.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Package deleted successfully' });
    } catch (err) {
      console.error(err);
    }
  }

  memoryPackages = memoryPackages.filter(p => p.id !== id);
  res.json({ success: true, message: 'Package deleted successfully' });
});

// --- HOTELS API ---
app.get('/api/hotels', async (req, res) => {
  if (isDBConnected) {
    try {
      const data = await Hotel.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: data.length, data });
    } catch (err) {
      console.error(err);
    }
  }
  res.json({ success: true, count: memoryHotels.length, data: memoryHotels });
});

app.post('/api/hotels', async (req, res) => {
  if (isDBConnected) {
    try {
      const newHotel = new Hotel({
        name: req.body.name,
        location: req.body.location || 'Uttarakhand',
        dest: req.body.dest || 'Nainital',
        rating: req.body.rating || '4.8 (New)',
        price: req.body.price || '4,999',
        image: req.body.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tag: req.body.tag || 'Luxury Resort',
        amenities: req.body.amenities || ['WiFi', 'Restaurant', 'Parking', 'Room Service']
      });
      const saved = await newHotel.save();
      return res.status(201).json({ success: true, data: saved });
    } catch (err) {
      console.error(err);
    }
  }

  const fallbackHotel = {
    id: 'htl-' + Date.now(),
    name: req.body.name,
    location: req.body.location || 'Uttarakhand',
    dest: req.body.dest || 'Nainital',
    rating: req.body.rating || '4.8 (New)',
    price: req.body.price || '4,999',
    image: req.body.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tag: req.body.tag || 'Luxury Resort',
    amenities: req.body.amenities || ['WiFi', 'Restaurant', 'Parking', 'Room Service']
  };
  memoryHotels.unshift(fallbackHotel);
  res.status(201).json({ success: true, data: fallbackHotel });
});

app.delete('/api/hotels/:id', async (req, res) => {
  const { id } = req.params;
  if (isDBConnected) {
    try {
      await Hotel.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Hotel deleted successfully' });
    } catch (err) {
      console.error(err);
    }
  }

  memoryHotels = memoryHotels.filter(h => h.id !== id);
  res.json({ success: true, message: 'Hotel deleted successfully' });
});

// --- POSTS API ---
app.get('/api/posts', async (req, res) => {
  const { page } = req.query;
  if (isDBConnected) {
    try {
      const query = page ? { page } : {};
      const data = await Post.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: data.length, data });
    } catch (err) {
      console.error(err);
    }
  }
  const filtered = page ? memoryPosts.filter(p => p.page === page) : memoryPosts;
  res.json({ success: true, count: filtered.length, data: filtered });
});

app.post('/api/posts', async (req, res) => {
  if (isDBConnected) {
    try {
      const newPost = new Post({
        page: req.body.page || 'destinations',
        title: req.body.title,
        subtitle: req.body.subtitle || '',
        image: req.body.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        description: req.body.description || ''
      });
      const saved = await newPost.save();
      return res.status(201).json({ success: true, data: saved });
    } catch (err) {
      console.error(err);
    }
  }

  const fallbackPost = {
    id: 'post-' + Date.now(),
    page: req.body.page || 'destinations',
    title: req.body.title,
    subtitle: req.body.subtitle || '',
    image: req.body.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: req.body.description || '',
    createdAt: new Date().toISOString()
  };
  memoryPosts.unshift(fallbackPost);
  res.status(201).json({ success: true, data: fallbackPost });
});

app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  if (isDBConnected) {
    try {
      await Post.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Post deleted successfully' });
    } catch (err) {
      console.error(err);
    }
  }

  memoryPosts = memoryPosts.filter(p => p.id !== id);
  res.json({ success: true, message: 'Post deleted successfully' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    dbConnected: isDBConnected,
    port: PORT,
    message: 'Atithya Stay Backend API is running smoothly'
  });
});

// Start Server and connect Database
app.listen(PORT, async () => {
  console.log(`🚀 Atithya Stay Backend API server running on http://localhost:${PORT}`);
  const conn = await connectDB();
  if (conn) {
    isDBConnected = true;
    await seedDatabaseIfEmpty();
  } else {
    console.log('⚠️ Running backend with in-memory persistence fallback');
  }
});
