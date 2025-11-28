import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type Decoration = {
  id: string;
  name: string;
  icon: string;
  price: number;
  category: string;
};

type ShopTabProps = {
  decorations: Decoration[];
  currentUserCoins: number;
  onBuyDecoration: (decoration: Decoration) => void;
};

const ShopTab = ({ decorations, currentUserCoins, onBuyDecoration }: ShopTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Магазин украшений</h1>
        <div className="flex items-center gap-2 px-4 py-2 neomorph rounded-xl">
          <Icon name="Coins" size={20} className="text-secondary" />
          <span className="font-semibold">{currentUserCoins}</span>
        </div>
      </div>

      {['Базовые', 'Премиум'].map(category => (
        <div key={category}>
          <h3 className="font-semibold text-lg mb-4">{category}</h3>
          <div className="grid grid-cols-2 gap-4">
            {decorations.filter(d => d.category === category).map(decoration => (
              <Card 
                key={decoration.id}
                className="neomorph border-0 overflow-hidden hover:shadow-lg transition-all"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">{decoration.icon}</div>
                  <h4 className="font-semibold mb-2">{decoration.name}</h4>
                  <div className="flex items-center justify-center gap-1 text-secondary mb-3">
                    <Icon name="Coins" size={16} />
                    <span className="font-semibold">{decoration.price}</span>
                  </div>
                  <Button 
                    size="sm"
                    className="w-full neomorph neomorph-hover rounded-xl"
                    onClick={() => onBuyDecoration(decoration)}
                  >
                    Купить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopTab;
