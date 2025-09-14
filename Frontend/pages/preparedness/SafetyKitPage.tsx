import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Page, SafetyKitItem } from '../../types';
import { safetyKitItems as initialSafetyKitItems, CheckCircleIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const SafetyKitPage: React.FC = () => {
  const { setCurrentPage, PALETTE } = useAppContext();
  const [items, setItems] = useState<SafetyKitItem[]>(initialSafetyKitItems);

  const toggleItem = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const completedItems = items.filter(item => item.checked).length;
  const totalItems = items.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div>
      <PageHeader title="Safety Kit Checklist" onBack={() => setCurrentPage(Page.HOME)} />
      <div className="space-y-4">
        <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold" style={{ color: PALETTE.text_primary }}>Checklist Progress</p>
            <p className="font-semibold" style={{ color: PALETTE.accent }}>{completedItems} / {totalItems}</p>
          </div>
          <div className="w-full h-3 rounded-full" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
            <div className="h-3 rounded-full" style={{ width: `${progress}%`, backgroundColor: PALETTE.accent }}></div>
          </div>
        </div>
        <div className="space-y-3">
          {items.map(item => (
            <div 
              key={item.id} 
              onClick={() => toggleItem(item.id)}
              className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200" 
              style={{ 
                backgroundColor: PALETTE.card, 
                boxShadow: item.checked ? PALETTE.button_inset_shadow : PALETTE.button_shadow 
              }}>
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
                {item.checked && <CheckCircleIcon className="w-5 h-5" style={{ color: PALETTE.accent }} />}
              </div>
              <p className={`font-semibold ${item.checked ? 'line-through' : ''}`} style={{ color: item.checked ? PALETTE.text_secondary : PALETTE.text_primary }}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyKitPage;
