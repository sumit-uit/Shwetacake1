import { Category } from './types';

export const MENU_DATA: Category[] = [
  {
    name: "Cakes",
    id: "cakes",
    description: "Each cake is crafted with the finest ingredients. Prices vary by flavor and size. See our delicious flavor options below.",
    products: [
      { name: "Rasmalai Cake", price: "6\": $75 | 8\": $100 | 10\": $130 | 12\": $160", description: "A delicate cardamom-spiced cake soaked in saffron milk, layered with rasmalai pieces and pistachio cream.", image: "https://lh3.googleusercontent.com/d/19KumTcjv6EsMuVKKw5fSide-0Dk8qUt1" },
      { name: "Pineapple Cake", price: "6\": $70 | 8\": $85 | 10\": $110 | 12\": $140", description: "A light and airy vanilla cake with layers of fresh pineapple filling and a whipped cream frosting.", image: "https://lh3.googleusercontent.com/d/19KumTcjv6EsMuVKKw5fSide-0Dk8qUt1" },
      { name: "Vanilla Cake", price: "6\": $60 | 8\": $75 | 10\": $95 | 12\": $120", description: "A classic, timeless vanilla cake with a smooth and creamy vanilla buttercream.", image: "https://images.unsplash.com/photo-1586985289936-a8aabe09a453?q=80&w=500&auto=format&fit=crop" },
      { name: "Chocolate Cake", price: "6\": $60 | 8\": $75 | 10\": $95 | 12\": $120", description: "A rich and decadent chocolate cake layered with a silky chocolate fudge filling and chocolate buttercream.", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=500&auto=format&fit=crop" },
      { name: "Marble Cake", price: "6\": $70 | 8\": $85 | 10\": $110 | 12\": $130", description: "The best of both worlds! A beautiful swirl of our classic vanilla and rich chocolate cakes.", image: "https://images.unsplash.com/photo-1626264023774-4b4737d1d27c?q=80&w=500&auto=format&fit=crop" },
      { name: "Caramel Cake", price: "6\": $60 | 8\": $75 | 10\": $95 | 12\": $120", description: "A soft, buttery cake with layers of homemade salted caramel sauce and a caramel buttercream.", image: "https://images.unsplash.com/photo-1562440156-3b6900defa9f?q=80&w=500&auto=format&fit=crop" },
      { name: "Butterscotch Cake", price: "6\": $70 | 8\": $85 | 10\": $110 | 12\": $130", description: "A brown sugar cake layered with a crunchy butterscotch brittle and a smooth butterscotch cream.", image: "https://images.unsplash.com/photo-1616831102107-15174f175d71?q=80&w=500&auto=format&fit=crop" },
      { name: "Gulab Jamun Cake", price: "6\": $75 | 8\": $100 | 10\": $130 | 12\": $160", description: "A fusion delight! Cardamom and rose-scented cake with pieces of gulab jamun and a light cream frosting.", image: "https://images.unsplash.com/photo-1631206753348-db232a909017?q=80&w=500&auto=format&fit=crop" },
      { name: "Falooda Cake", price: "6\": $90 | 8\": $110 | 10\": $140 | 12\": $180", description: "Inspired by the classic dessert, this cake features layers of rose-flavored cake, vermicelli, and basil seeds.", image: "https://images.unsplash.com/photo-1616690710400-a15d233c10f8?q=80&w=500&auto=format&fit=crop" },
      { name: "Rabri Falooda Cake", price: "6\": $95 | 8\": $120 | 10\": $155 | 12\": $200", description: "An elevated Falooda cake with the added richness of creamy, thickened rabri in every layer.", image: "https://images.unsplash.com/photo-1567327683935-950945c71a39?q=80&w=500&auto=format&fit=crop" },
      { name: "Paan Cake", price: "6\": $75 | 8\": $100 | 10\": $130 | 12\": $160", description: "A unique and refreshing cake infused with the aromatic flavors of paan (betel leaf) and gulkand (rose petal jam).", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=500&auto=format&fit=crop" },
      { name: "Mango Cake", price: "6\": $70 | 8\": $90 | 10\": $115 | 12\": $145", description: "A seasonal favorite, this cake is layered with sweet mango puree and fresh mango chunks.", image: "https://images.unsplash.com/photo-1627834393139-5b7f2fe1f5b6?q=80&w=500&auto=format&fit=crop" },
    ],
  },
  {
    name: "Custom Celebration Cakes",
    id: "custom-cakes",
    description: "Let's create the cake of your dreams for your special occasion. From elegant wedding tiers to fun, themed birthday cakes, we bring your vision to life. Contact us for a personalized consultation and quote.",
    products: [
        { name: "Wedding Cakes", price: "By Quote", description: "Elegant and delicious multi-tiered cakes, designed to be the centerpiece of your big day.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop" },
        { name: "Themed & Birthday Cakes", price: "By Quote", description: "Personalized cakes for birthdays, showers, and any celebration. Tell us your theme, and we'll work our magic.", image: "https://images.unsplash.com/photo-1558326567-98ae2405526b?q=80&w=500&auto=format&fit=crop" },
    ]
  },
  {
    name: "Cupcakes",
    id: "cupcakes",
    description: "Cupcakes are available in many of our cake flavours. Minimum order of 1 dozen per flavour.",
    products: [
      { name: "Vanilla Bean Cupcake", price: "Starts at $55/dozen", description: "Classic vanilla cupcakes topped with our signature vanilla buttercream.", image: "https://images.unsplash.com/photo-1587668178277-2952ac3f3244?q=80&w=500&auto=format&fit=crop" },
      { name: "Chocolate Fudge Cupcake", price: "Starts at $55/dozen", description: "Rich chocolate cupcakes with a decadent chocolate fudge frosting.", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=500&auto=format&fit=crop" },
      { name: "Biscoff Cookie Cupcake", price: "Starts at $55/dozen", description: "Brown sugar cupcakes with Biscoff cookie crumble and Biscoff buttercream.", image: "https://images.unsplash.com/photo-1614707268736-553b3c390234?q=80&w=500&auto=format&fit=crop" },
      { name: "Red Velvet Cupcake", price: "Starts at $55/dozen", description: "A cupcake version of our classic cake with tangy cream cheese frosting.", image: "https://images.unsplash.com/photo-1564348501091-a53a6a1c1d39?q=80&w=500&auto=format&fit=crop" },
      { name: "Lemon Raspberry Cupcake", price: "Starts at $55/dozen", description: "Zesty lemon cupcakes filled with raspberry compote, topped with lemon cream cheese frosting.", image: "https://images.unsplash.com/photo-1550617883-9a3b6f52a7c4?q=80&w=500&auto=format&fit=crop" },
      { name: "Funfetti Cupcake", price: "Starts at $55/dozen", description: "Vanilla bean cupcakes filled with colourful sprinkles and vanilla buttercream.", image: "https://images.unsplash.com/photo-1562991054-a2a4720e14a1?q=80&w=500&auto=format&fit=crop" },
      { name: "Carrot Cupcake", price: "Starts at $55/dozen", description: "Moist carrot cupcakes with pecans and spices, topped with cream cheese frosting.", image: "https://images.unsplash.com/photo-1621280029255-827c83b8b9f7?q=80&w=500&auto=format&fit=crop" },
    ],
  },
  {
    name: "Cookies",
    id: "cookies",
    description: "From custom designs to gourmet classics. Decorated cookies: min 2 dozen. Gourmet cookies: min 1 dozen.",
    products: [
      { name: "Decorated Sugar Cookies", price: "Starts at $65/dozen", description: "Beautifully handcrafted vanilla bean sugar cookies, decorated with royal icing to match any theme.", image: "https://images.unsplash.com/photo-1583224798625-8f7b579133a8?q=80&w=500&auto=format&fit=crop" },
      { name: "Gourmet Chocolate Chip", price: "Starts at $40/dozen", description: "The ultimate comfort cookie, loaded with semi-sweet chocolate chips and a hint of sea salt.", image: "https://images.unsplash.com/photo-1598114355554-128c7e954c1d?q=80&w=500&auto=format&fit=crop" },
      { name: "Gourmet Biscoff White Chocolate", price: "Starts at $40/dozen", description: "A chewy cookie packed with Biscoff cookie pieces and creamy white chocolate chips.", image: "https://images.unsplash.com/photo-1620950346203-a1b7ab41e892?q=80&w=500&auto=format&fit=crop" },
      { name: "Gourmet Brown Butter Toffee", price: "Starts at $40/dozen", description: "A nutty, rich cookie made with browned butter, toffee bits, and chocolate chips.", image: "https://images.unsplash.com/photo-1618923488225-8854b423f135?q=80&w=500&auto=format&fit=crop" },
      { name: "Gourmet Double Chocolate", price: "Starts at $40/dozen", description: "For the chocolate lover, a rich chocolate cookie with semi-sweet chocolate chips.", image: "https://images.unsplash.com/photo-1477414953175-286a23a31b91?q=80&w=500&auto=format&fit=crop" },
      { name: "Gourmet Funfetti", price: "Starts at $40/dozen", description: "A sweet and chewy sugar cookie loaded with colourful sprinkles.", image: "https://images.unsplash.com/photo-1599326662130-3c13038b3234?q=80&w=500&auto=format&fit=crop" },
    ],
  },
  {
    name: "Other Treats",
    id: "other-treats",
    description: "More deliciousness from our bakery. Minimum order of 1 dozen.",
    products: [
      { name: "Cakesicles", price: "Starts at $65/dozen", description: "Cake pops shaped like popsicles, dipped in chocolate and decorated to your theme.", image: "https://images.unsplash.com/photo-1615735165839-44434b92b0e2?q=80&w=500&auto=format&fit=crop" },
      { name: "Fudgy Brownies", price: "Starts at $50/dozen", description: "Intensely chocolatey and perfectly fudgy brownies with a crinkly top.", image: "https://images.unsplash.com/photo-1590841334995-361952a74c43?q=80&w=500&auto=format&fit=crop" },
      { name: "Mini Cheesecakes", price: "Starts at $60/dozen", description: "Rich and creamy individual cheesecakes with a graham cracker crust. Assorted toppings available.", image: "https://images.unsplash.com/photo-1624383233802-7a022a106e40?q=80&w=500&auto=format&fit=crop" },
      { name: "French Macarons", price: "Starts at $35/dozen", description: "Delicate and chewy almond meringue cookies with various fillings. Assorted flavours.", image: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?q=80&w=500&auto=format&fit=crop" },
    ],
  },
];