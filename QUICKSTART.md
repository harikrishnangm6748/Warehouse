# ⚡ Quick Start Guide - Warehouse Management System

> Get the warehouse management system running in 5 minutes!

---

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (2 min)
```bash
cd /workspaces/Warehouse
npm install
```

### Step 2: Start Development Server (30 sec)
```bash
npm start
```
You'll see: `✔ Compiled successfully` and a localhost URL

### Step 3: Open in Browser (30 sec)
Navigate to:
```
http://localhost:4200
```

### Step 4: Login (1 min)
```
Email: demo@warehouse.com
Password: password123
Role: EMPLOYEE (select from dropdown)
Click: Login
```

### Step 5: Explore! (1 min)
- Click "Create Order" to create an order
- Go back and click "My Orders" to see your orders
- Use sidebar to navigate

---

## 📱 Available Portals

### Employee Portal
- ✅ Create Orders
- ✅ View My Orders
- ✅ Track Order Status
- ✅ View Order Details

### Warehouse Portal
👉 Try it: Change role to `WAREHOUSE` in login

- ✅ Orders Queue
- ✅ Inventory Check
- ✅ Dispatch Orders

### Operations Portal
👉 Try it: Change role to `OPERATIONS` in login

- ✅ Shipments Queue
- ✅ Shipment Details
- ✅ Exception Management

---

## 📊 Test Scenarios

### Scenario 1: Create and Track Order (Employee)
```
1. Login as EMPLOYEE
2. Dashboard → Create Order
3. Fill in customer details
4. Add 3 items
5. Click "Submit Order"
6. Go to "My Orders"
7. Click on order to see details
8. Click "View Status Timeline"
```

### Scenario 2: Process Inventory (Warehouse)
```
1. Login as WAREHOUSE
2. Dashboard → Orders Queue
3. Click any order → "Check Inventory"
4. Search for an item
5. Click item → enter quantity → "Reserve"
6. See reservation in panel below
```

### Scenario 3: Track Shipments (Operations)
```
1. Login as OPERATIONS
2. Dashboard → Shipments Queue
3. Click any shipment card
4. Go to "Tasks" tab → See delivery tasks
5. Go to "Exceptions" tab → Add an exception
6. Fill severity and description
7. Click "Report Exception"
```

---

## 🎨 Quick UI Tour

### Navigation
```
┌─────────────────────────┐
│ WAREHOUSE              │ ← Logo/Home
├─────────────────────────┤
│ ☰ Menu 🏠 Dashboard    │ ← Top bar
│ 🔔 Notifications 👤    │
├─────────────────────────┤
│ ⭐ Featured Actions     │ ← Quick buttons
├─────────────────────────┤
│ 📦 Dashboard Stats     │ ← Statistics cards
├─────────────────────────┤
│ 📘 Sidebar Menu        │ ← Role-based menu
│  • Create Order        │   (changes per role)
│  • My Orders           │
│  • Inventory           │
│  • Shipments           │
│  • Notifications       │
│  • Logout              │
└─────────────────────────┘
```

---

## 🔧 Common Tasks

### Create a New Order
```
1. Click "Create Order"
2. Enter customer name
3. Enter email & phone
4. Enter shipping address
5. Click "+ Add Item"
6. Select product, quantity, price
7. Repeat for more items
8. Review total at bottom
9. Click "Submit Order"
```

### Track Order Status
```
1. Go to "My Orders"
2. Find your order
3. Click order card
4. Click "View Status Timeline"
5. See order progression with dates
```

### Reserve Inventory
```
1. Go to "Inventory Check"
2. Search for item
3. Click item row
4. Enter quantity
5. Click "Reserve"
6. See in right panel
```

### Monitor Shipments
```
1. Go to "Shipments Queue"
2. Filter by status
3. Click shipment card
4. See progress bar
5. Click for details
```

---

## 🔐 Test Account

```
Email:    demo@warehouse.com
Password: password123

Available Roles:
- EMPLOYEE
- WAREHOUSE
- OPERATIONS
- ADMIN
```

> Each role has different features and menu items!

---

## 📱 Mobile Testing

### Desktop Browser DevTools
1. Press `F12` to open DevTools
2. Click device toggle (mobile icon)
3. Select "iPhone 12" or similar
4. See responsive layout

### Responsive Sizes
- Reset: `Ctrl+Shift+M`
- Mobile: 375px wide
- Tablet: 768px wide
- Desktop: 1024px+ wide

---

## 🐛 Quick Troubleshooting

### "Port 4200 already in use"
```bash
ng serve --port 4300
```

### "Module not found" error
```bash
rm -rf node_modules
npm install
```

### Page blank or not loading
```bash
# Hard refresh
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)
```

### CSS not updating
```bash
# Restart server
Ctrl + C in terminal
npm start
```

---

## 📊 What You Can Do NOW

### ✅ Immediate
- [x] Login and explore
- [x] Create test orders
- [x] Navigate between roles
- [x] View all components
- [x] Test responsive design

### 🔄 Next Phase
- [ ] Connect to real backend API
- [ ] Implement real authentication
- [ ] Connect to database
- [ ] Deploy to server

---

## 📚 Quick Reference

### Navigation Commands
| Action | How |
|--------|-----|
| Go Home | Click logo or Dashboard |
| Change Role | Logout → Select new role → Login |
| View Notifications | Click 🔔 bell icon |
| Logout | Click 👤 → Logout |

### Component Features
| Component | Main Actions |
|-----------|--------|
| Create Order | Add items, calculate total, submit |
| My Orders | Filter, search, view details |
| Order Timeline | Visual status progression |
| Orders Queue | Filter, sort, check inventory |
| Inventory Check | Search, reserve items |
| Dispatch Order | Create shipment, add carrier |
| Shipments Queue | Filter, view progress |
| Shipment Details | View tasks, add exceptions |

---

## 🎯 Next Steps

### To Learn More
1. Read [README.md](README.md) for detailed info
2. Read [ANGULAR_UI_GUIDE.md](ANGULAR_UI_GUIDE.md) for component docs
3. Check [models/interfaces.ts](src/app/models/interfaces.ts) for data structures

### To Integrate Backend
1. Update API URLs in services
2. Replace mock setTimeout calls with HTTP requests
3. Update components to use real Observable data

### To Deploy
```bash
# Build for production
ng build --configuration production

# Outputs to: dist/warehouse-ui/
```

---

## 💡 Pro Tips

1. **Try Different Roles**
   - Each role shows different menu items and features
   - Login → Logout → Choose different role → Login

2. **Mobile View**
   - Open DevTools (F12)
   - Click mobile icon
   - See responsive design

3. **Mock Data**
   - All data is currently in-memory
   - Data resets when page refreshes
   - Ready for API integration

4. **Search & Filter**
   - Most components have search boxes
   - Use filters to narrow down results
   - Combine for advanced filtering

---

## 📞 Need Help?

| Issue | Solution |
|-------|----------|
| Can't login | Check email/password demo@warehouse.com / password123 |
| Page blank | Try hard refresh (Ctrl+Shift+Delete) |
| Slow performance | Restart server: Ctrl+C then npm start |
| Responsive broken | Close/reopen browser DevTools |
| Missing components | Check you npm install completed |

---

## 🎉 You're Ready!

Your warehouse management system is fully functional and ready to explore.

Start with:
```bash
npm start
```

Then navigate to:
```
http://localhost:4200
```

**Enjoy! 🚀📦**

---

**Last Updated**: April 2026  
**Version**: 1.0.0  
**Status**: ✅ Ready to Use
