import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Product {
  name: string;
  quantity: number;
  color: string;
}

export function PageObjectModelPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newProduct = {
      name: formData.get('name') as string,
      quantity: Number(formData.get('quantity')),
      color: formData.get('color') as string,
    };
    setProducts([...products, newProduct]);
    form.reset();
    setIsLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Tabs defaultValue="demo" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="demo">Live Demo</TabsTrigger>
        <TabsTrigger value="implementation">Implementation</TabsTrigger>
      </TabsList>

      <TabsContent value="demo" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Management System</CardTitle>
            <CardDescription>
              A practical example demonstrating Page Object Model implementation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Login Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Login</h3>
              <form className="space-y-4" data-testid="login-form">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    data-testid="username-input"
                    defaultValue="test"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    data-testid="password-input"
                    defaultValue="test"
                  />
                </div>
                <Button data-testid="login-button">Login</Button>
              </form>
            </div>

            {/* Product Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add Product</h3>
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="product-form">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    data-testid="product-name-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    required
                    min="1"
                    data-testid="product-quantity-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select name="color" required>
                    <SelectTrigger data-testid="product-color-select">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={isLoading} data-testid="submit-product-button">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Product
                </Button>
              </form>
            </div>

            {/* Product Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product List</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="product-search-input"
                />
                <div className="border rounded-lg divide-y">
                  {filteredProducts.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No products found
                    </div>
                  ) : (
                    filteredProducts.map((product, index) => (
                      <div
                        key={index}
                        className="p-4 flex justify-between items-center"
                        data-testid={`product-item-${index}`}
                      >
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: product.color }}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="implementation" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Page Object Implementation</CardTitle>
            <CardDescription>
              Example of how to structure page objects for this application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Login Page Object */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Login Page Object</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// loginPage.ts
export class LoginPage {
  private selectors = {
    username: '[data-testid="username-input"]',
    password: '[data-testid="password-input"]',
    loginButton: '[data-testid="login-button"]'
  };

  async login(username: string, password: string) {
    await this.setUsername(username);
    await this.setPassword(password);
    await this.clickLogin();
  }

  private async setUsername(username: string) {
    await this.page.fill(this.selectors.username, username);
  }

  private async setPassword(password: string) {
    await this.page.fill(this.selectors.password, password);
  }

  private async clickLogin() {
    await this.page.click(this.selectors.loginButton);
  }
}`}
              </pre>
            </div>

            {/* Product Form Page Object */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Form Page Object</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// productFormPage.ts
interface ProductData {
  name: string;
  quantity: number;
  color: string;
}

export class ProductFormPage {
  private selectors = {
    nameInput: '[data-testid="product-name-input"]',
    quantityInput: '[data-testid="product-quantity-input"]',
    colorSelect: '[data-testid="product-color-select"]',
    submitButton: '[data-testid="submit-product-button"]'
  };

  async addProduct(product: ProductData) {
    await this.setName(product.name);
    await this.setQuantity(product.quantity);
    await this.selectColor(product.color);
    await this.submitForm();
  }

  private async setName(name: string) {
    await this.page.fill(this.selectors.nameInput, name);
  }

  private async setQuantity(quantity: number) {
    await this.page.fill(
      this.selectors.quantityInput, 
      quantity.toString()
    );
  }

  private async selectColor(color: string) {
    await this.page.click(this.selectors.colorSelect);
    await this.page.click(\`text=\${color}\`);
  }

  private async submitForm() {
    await this.page.click(this.selectors.submitButton);
  }
}`}
              </pre>
            </div>

            {/* Product Grid Page Object */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Grid Page Object</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// productGridPage.ts
export class ProductGridPage {
  private selectors = {
    searchInput: '[data-testid="product-search-input"]',
    productItem: '[data-testid^="product-item-"]'
  };

  async searchProducts(term: string) {
    await this.page.fill(this.selectors.searchInput, term);
  }

  async getProductCount() {
    return this.page.$$eval(
      this.selectors.productItem,
      items => items.length
    );
  }

  async getProductDetails(index: number) {
    const selector = \`[data-testid="product-item-\${index}"]\`;
    return {
      name: await this.page.$eval(
        \`\${selector} h4\`,
        el => el.textContent
      ),
      quantity: await this.page.$eval(
        \`\${selector} p\`,
        el => parseInt(el.textContent.match(/\\d+/)[0])
      )
    };
  }
}`}
              </pre>
            </div>

            {/* Example Test */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Example Test</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// productWorkflow.test.ts
describe('Product Management Workflow', () => {
  let loginPage: LoginPage;
  let productForm: ProductFormPage;
  let productGrid: ProductGridPage;

  beforeEach(() => {
    loginPage = new LoginPage(page);
    productForm = new ProductFormPage(page);
    productGrid = new ProductGridPage(page);
  });

  test('should add and find product', async () => {
    // Login
    await loginPage.login('test', 'test');

    // Add product
    const product = {
      name: 'Test Product',
      quantity: 5,
      color: 'blue'
    };
    await productForm.addProduct(product);

    // Search and verify
    await productGrid.searchProducts(product.name);
    const count = await productGrid.getProductCount();
    expect(count).toBe(1);

    const details = await productGrid.getProductDetails(0);
    expect(details.name).toBe(product.name);
    expect(details.quantity).toBe(product.quantity);
  });
});`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}