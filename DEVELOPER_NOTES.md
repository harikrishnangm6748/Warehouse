# 👨‍💻 Developer Notes - Warehouse Management System

> Internal documentation for developers extending and maintaining the system.

---

## 📋 Project Overview

**Status**: ✅ Feature Complete (v1.0.0)  
**Architecture**: Angular 18 Standalone Components  
**Styling**: Pure CSS3 (No frameworks)  
**State**: Mock data (Ready for API integration)  
**Testing**: Manual (Ready for unit/e2e tests)

---

## 🏗️ Architecture

### Layer Structure
```
Presentation Layer
├── Components (13 total)
├── Templates (HTML)
└── Styles (CSS)
      ↓
Logic Layer
├── Services (6 total)
├── Guards (Ready to implement)
└── Interceptors (Ready to implement)
      ↓
Data Layer
├── Models (13 interfaces)
├── Mock Data (Ready for replacement)
└── Storage (localStorage)
      ↓
Backend API (To be implemented)
```

### Component Hierarchy
```
AppComponent (Root)
└── LayoutComponent (Main shell)
    ├── Sidebar (Navigation)
    ├── Top Bar (User info)
    └── RouterOutlet
        ├── LoginComponent
        ├── DashboardComponent
        ├── NotificationsComponent
        └── Feature Components (11 total)
```

---

## 📁 File Conventions

### Naming
```
Component files:         component-name/component-name.component.ts
Template files:          component-name.component.html
Stylesheet files:        component-name.component.css
Service files:           service-name.service.ts
Interface files:         interfaces.ts (all in one file)
Guard files:             guard-name.guard.ts
Pipe files:              pipe-name.pipe.ts
```

### Folder Structure
```
Each component has dedicated folder:
pages/
├── employee/
│   ├── create-order/
│   │   ├── create-order.component.ts
│   │   ├── create-order.component.html
│   │   └── create-order.component.css
│   └── ... (4 components)
├── warehouse/
│   └── ... (3 components)
├── operations/
│   └── ... (2 components)
└── ... (4 more)
```

---

## 💾 Key Files Explained

### 1. app.routes.ts (Route Configuration)
```typescript
Location: src/app/app.routes.ts
Purpose: Defines all application routes
Structure: Array of Route objects
Current: 13 routes (one per component)
Latest Feature: Ready for lazy loading
```

### 2. models/interfaces.ts (Data Models)
```typescript
Location: src/app/models/interfaces.ts
Purpose: Central TypeScript interface definitions
Size: ~380 lines
Includes: 13+ interfaces for type safety
```

### 3. services/ (Business Logic)
```typescript
Location: src/app/services/
Files:
- storage.service.ts - localStorage wrapper
- auth.service.ts - Authentication (ready for API)
- order.service.ts - Order operations
- inventory.service.ts - Inventory management
- shipment.service.ts - Shipment tracking
- notification.service.ts - Notifications
```

### 4. layout.component.ts (Main Shell)
```typescript
Location: src/app/layout/
Purpose: Wraps all pages with navigation
Features: Sidebar, top bar, responsive design
Size: ~34 lines TS + 82 lines HTML + 320 lines CSS
```

---

## 🔄 Component Patterns

### Pattern 1: Data Display Component
Example: `my-orders.component.ts`

```typescript
export class MyOrdersComponent {
  // Private fields
  private orders: Order[] = [];
  private searchTerm = '';
  
  // Public fields for template
  filteredOrders: Order[] = [];
  statusFilter = 'ALL';
  
  // Lifecycle
  ngOnInit() {
    this.loadOrders();
  }
  
  // Methods
  loadOrders() { /* get data */ }
  filterOrders() { /* apply filters */ }
  search(term: string) { /* search logic */ }
}
```

**Template Usage**:
```html
<input (keyup)="search($event.target.value)">
<select (change)="filterOrders()">
<div *ngFor="let order of filteredOrders">
```

### Pattern 2: Form Component
Example: `create-order.component.ts`

```typescript
export class CreateOrderComponent {
  // Reactive form
  orderForm = new FormGroup({
    customerName: new FormControl('', [Validators.required]),
    items: new FormArray([])
  });
  
  // Lifecycle
  ngOnInit() { /* setup form */ }
  
  // Methods
  addItem() { /* add to FormArray */ }
  submit() { /* validate and submit */ }
}
```

**Template Usage**:
```html
<form [formGroup]="orderForm">
  <input formControl="customerName">
  <div formArrayName="items">
    <div *ngFor="let item of items.controls">
      <!-- item form -->
    </div>
  </div>
</form>
```

### Pattern 3: Tab Component
Example: `shipment-details.component.ts`

```typescript
export class ShipmentDetailsComponent {
  activeTab: 'tasks' | 'exceptions' = 'tasks';
  
  switchTab(tab: 'tasks' | 'exceptions') {
    this.activeTab = tab;
  }
}
```

**Template Usage**:
```html
<div class="tabs">
  <button [class.active]="activeTab === 'tasks'">
    Tasks
  </button>
  <button [class.active]="activeTab === 'exceptions'">
    Exceptions
  </button>
</div>
<div *ngIf="activeTab === 'tasks'">
  <!-- Tasks content -->
</div>
```

---

## 🎨 CSS Architecture

### Responsive Design Pattern
All CSS files follow this pattern:

```css
/* 1. Variables & Resets */
:root {
  --primary: #007bff;
  --secondary: #6c757d;
  /* ... more variables */
}

/* 2. Base Styles */
body { }
.container { }

/* 3. Component Specific */
.component-name { }
.component-name__element { }
.component-name--active { }

/* 4. Responsive */
@media (max-width: 1023px) {
  /* Tablet styles */
}

@media (max-width: 767px) {
  /* Mobile styles */
}
```

### Color Scheme
```scss
Primary:    #007bff (Blue)
Secondary:  #6c757d (Gray)
Success:    #28a745 (Green)
Warning:    #ffc107 (Yellow)
Danger:     #dc3545 (Red)
Info:       #17a2b8 (Cyan)
Light:      #f8f9fa (White-ish)
Dark:       #343a40 (Black-ish)
```

### Common Classes
```css
.container         /* Max-width container */
.row              /* Flex row */
.col              /* Flex column */
.card             /* Card component */
.btn              /* Button base */
.btn-primary      /* Primary button */
.form-group       /* Form element */
.table-responsive /* Table wrapper */
.modal            /* Modal dialog */
.badge            /* Status badge */
.progress         /* Progress bar */
```

---

## 🔌 Service Integration Pattern

### Current State (Mock)
```typescript
// services/order.service.ts
getOrders(): Promise<Order[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(this.mockOrders);
    }, 500);
  });
}
```

### After Backend Integration
```typescript
// services/order.service.ts
constructor(private http: HttpClient) {}

getOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.apiUrl}/orders`);
}
```

### Component Update
```typescript
// components/my-orders/my-orders.component.ts

// Before (Promise)
this.orderService.getOrders().then(data => {
  this.orders = data;
});

// After (Observable)
this.orders$ = this.orderService.getOrders();
// In template: {{ (orders$ | async) }}
```

---

## 🔐 Authentication Flow

### Current State
- Local login with role selection
- Data stored in localStorage
- No persistence between sessions

### Ready-to-Implement Flow
```
1. User enters credentials → LoginComponent
2. LoginComponent calls → AuthService.login()
3. AuthService makes → HTTP POST to /api/auth/login
4. Server returns → JWT Token
5. Token stored → localStorage
6. AuthService emits → isAuthenticated Subject
7. Route Guards check → Token validity
8. Navigation Guard → Redirects to login if invalid
```

### Guard Implementation Template
```typescript
// guards/auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      tap(authenticated => {
        if (!authenticated) this.router.navigate(['/login']);
      })
    );
  }
}

// Usage in routes
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}
```

---

## 📊 Data Flow Example: Create Order

### User Action Flow
```
User fills form
↓
Component.orderForm.valid?
↓ YES
Component.submit()
↓
OrderService.createOrder(data)
↓
Current: setTimeout() → Mock storage
Future: HTTP POST → Backend API
↓
Success?
↓ YES
Navigate to "My Orders"
↓ NO
Show error message
```

### Template to Service
```typescript
// Template
<form [formGroup]="orderForm" (ngSubmit)="onSubmit()">
  <input formControlName="customerName">
  <input formControlName="email">
  <!-- ... more fields ... -->
  <button type="submit" [disabled]="!orderForm.valid">
    Submit Order
  </button>
</form>

// Component
onSubmit() {
  if (this.orderForm.valid) {
    const orderData = this.orderForm.value as CreateOrderDto;
    this.orderService.createOrder(orderData)
      .then(result => {
        this.router.navigate(['/employee/my-orders']);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }
}

// Service (Current)
createOrder(data: CreateOrderDto): Promise<Order> {
  return new Promise(resolve => {
    setTimeout(() => {
      const order = { ...data, id: generateId(), status: 'PENDING' };
      this.orders.push(order);
      resolve(order);
    }, 500);
  });
}

// Service (After API Integration)
createOrder(data: CreateOrderDto): Observable<Order> {
  return this.http.post<Order>(`${this.apiUrl}/orders`, data);
}
```

---

## 🧪 Testing Guidelines

### Unit Test Template
```typescript
describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load orders on init', () => {
    spyOn(component, 'loadOrders');
    component.ngOnInit();
    expect(component.loadOrders).toHaveBeenCalled();
  });
});
```

### E2E Test Template
```typescript
describe('Employee Order Creation', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type('demo@warehouse.com');
    cy.get('[data-testid="password"]').type('password123');
    cy.get('[data-testid="role"]').select('EMPLOYEE');
    cy.get('[data-testid="login-btn"]').click();
  });
  
  it('should create a new order', () => {
    cy.get('[data-testid="create-order-btn"]').click();
    cy.get('[data-testid="customer-name"]').type('John Doe');
    cy.get('[data-testid="add-item-btn"]').click();
    cy.get('[data-testid="submit-btn"]').click();
    cy.contains('Order created successfully').should('be.visible');
  });
});
```

---

## 🚀 Deployment Checklist

### Before Production
- [ ] All API endpoints configured
- [ ] Authentication tokens implemented
- [ ] Error handling tested
- [ ] Loading states verified
- [ ] Mobile responsiveness tested
- [ ] Unit tests passing
- [ ] E2E tests passing
- [ ] Performance profiled
- [ ] Security audit completed
- [ ] Environment variables set

### Build Command
```bash
ng build --configuration production

# Output location: dist/warehouse-ui/
```

### Deployment Options
1. **Vercel**: `vercel deploy`
2. **Netlify**: `netlify deploy --prod`
3. **Docker**: Create Dockerfile
4. **AWS S3**: `aws s3 sync dist s3://bucket-name`
5. **Azure**: Static Web Apps deployment

---

## 📝 Code Style Guidelines

### TypeScript
```typescript
// ✅ Good
const userName: string = 'John';
const isActive: boolean = true;
private orders: Order[] = [];

// ❌ Avoid
let user = 'John';
let active = true;
private o = [];
```

### Component Structure
```typescript
export class MyComponent implements OnInit, OnDestroy {
  // 1. Public fields
  data: any[] = [];
  
  // 2. Private fields
  private subscription: Subscription;
  
  // 3. Constructor
  constructor(private service: MyService) {}
  
  // 4. Lifecycle hooks
  ngOnInit() { }
  ngOnDestroy() { }
  
  // 5. Public methods
  public loadData() { }
  
  // 6. Private methods
  private processData() { }
}
```

### Template Structure
```html
<!-- 1. Top-level container -->
<div class="component-wrapper">
  
  <!-- 2. Header section -->
  <div class="component-header">
    <h1>Title</h1>
  </div>
  
  <!-- 3. Control section -->
  <div class="component-controls">
    <input placeholder="Search">
    <select>Options</select>
  </div>
  
  <!-- 4. Main content -->
  <div class="component-content">
    <div *ngFor="let item of items">{{ item }}</div>
  </div>
  
  <!-- 5. Footer section -->
  <div class="component-footer">
    <button>Action</button>
  </div>
  
</div>
```

---

## 🔗 Common Integration Points

### Adding New Component
1. Generate component: `ng generate component pages/new-page`
2. Add route to `app.routes.ts`
3. Add menu item to `layout.component.ts`
4. Create service if needed: `ng generate service services/new-service`
5. Add interface to `models/interfaces.ts`

### Adding New Service
1. Generate service: `ng generate service services/my-service`
2. Inject into component: `constructor(private myService: MyService)`
3. Call service methods: `this.myService.getData()`
4. Handle responses: `.subscribe()` or `.then()`

### Adding New Route
1. Update `app.routes.ts`:
```typescript
{
  path: 'my-page',
  component: MyPageComponent
}
```
2. Add navigation in template:
```html
<a routerLink="/my-page">Go to My Page</a>
```

---

## 🐛 Debugging Tips

### Angular DevTools
```
1. Install: Angular DevTools Chrome extension
2. Open DevTools (F12)
3. Go to "Angular" tab
4. Inspect components
5. Track change detection
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Component not rendering | Check if route is correct, component imported |
| Styles not applying | Clear cache, check CSS file location |
| Service not injecting | Add `providedIn: 'root'` to service |
| Event not firing | Check event binding syntax `(click)` vs `[click]` |
| Data not updating | Check for async/await, Observables |
| Performance slow | Use DevTools Performance tab, check change detection |

---

## 📚 Quick Reference Commands

### Development
```bash
npm start              # Start dev server
npm test               # Run tests
npm run lint           # Run linter
ng generate c comp    # Generate component
ng serve --port 4300  # Use different port
```

### Production
```bash
ng build --prod       # Production build
npm run build:prod    # Alternative
ng serve --prod       # Prod preview
```

### Utilities
```bash
ng update @angular/core @angular/cli  # Update Angular
npm outdated          # Check for outdated packages
npm audit             # Security audit
npm audit fix         # Fix vulnerabilities
```

---

## 🎯 Next Priority Tasks

1. **High Priority**
   - [ ] Connect to real backend API
   - [ ] Implement JWT authentication
   - [ ] Add route guards

2. **Medium Priority**
   - [ ] Add unit tests
   - [ ] Add E2E tests
   - [ ] Implement error handling

3. **Low Priority**
   - [ ] Add analytics
   - [ ] Implement WebSockets
   - [ ] Add offline support

---

## 📞 Developer Reference

**Angular Version**: 18.0.0  
**TypeScript Version**: 5.4.0  
**Last Updated**: April 2026  
**Maintainer**: Warehouse Dev Team

---

**Happy Coding! 🚀**
