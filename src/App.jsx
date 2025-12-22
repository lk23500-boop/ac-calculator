import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Wind, 
  Ruler, 
  Drill, 
  Wrench, 
  Snowflake, 
  RotateCcw, 
  CheckCircle2,
  AlertCircle,
  Home,
  Flame,
  ArrowRight,
  Droplets,
  Zap,
  Waves,
  Trash2,
  Truck,
  HardHat,
  Recycle,
  Info,
  FileText,
  Copy,
  Check,
  Link,
  Printer,
  X
} from 'lucide-react';

export default function App() {
  // --- 상태 관리 ---
  const [acMode, setAcMode] = useState('cooling'); 
  const [acType, setAcType] = useState('wall'); 
  const [acCount, setAcCount] = useState(1); 
  const [installType, setInstallType] = useState('general'); 
  
  const [pipeLength, setPipeLength] = useState(0); 
  const [pipeLengthWall, setPipeLengthWall] = useState(0); 
  
  const [buriedCount, setBuriedCount] = useState(1);

  const [holeCountGeneral, setHoleCountGeneral] = useState(0); 
  const [holeCountDifficult, setHoleCountDifficult] = useState(0); 
  const [holeCountSpecial, setHoleCountSpecial] = useState(0); 

  const [specialPipeLength, setSpecialPipeLength] = useState(0); 
  
  const [rackCounts, setRackCounts] = useState({
    new_900: 0, new_1000: 0, new_1100: 0, new_dual: 0, new_custom: 0,
    exist_small: 0, exist_large: 0,
    danger_small: 0, danger_medium: 0, danger_large: 0,
    base_pvc: 0, base_angle: 0
  });

  // 호환성 유지용 상태
  const [rackType, setRackType] = useState('none'); 
  const [newRackSize, setNewRackSize] = useState('size900'); 
  const [existRackSize, setExistRackSize] = useState('small');
  const [dangerSize, setDangerSize] = useState('small');
  const [baseType, setBaseType] = useState('pvc');

  // 냉매 옵션 상태
  const [gasCounts, setGasCounts] = useState({
    cool_under5: 0, cool_over5: 0, heat_under5: 0, heat_over5: 0, over10: 0
  });
  const [gasOption, setGasOption] = useState('none'); 

  const [powerCableType, setPowerCableType] = useState('under40'); 
  const [powerCableLength, setPowerCableLength] = useState(0); 
  
  // 차단기 수량 관리
  const [breakerCounts, setBreakerCounts] = useState({
    '1p30a': 0, '1p50a': 0, '3p30a': 0, '3p50a': 0, 
    'box_1p': 0, 'box_3p': 0, 
    'connection_1p': 0, 'connection_3p': 0
  });
  const [breakerType, setBreakerType] = useState('none'); 

  // 배수 펌프 수량 관리
  const [drainPumpCounts, setDrainPumpCounts] = useState({
    'std_4m': 0, 'std_6m': 0, 'std_8m': 0, 'std_over10': 0, 'low_noise': 0, 'own': 0
  });
  const [drainPump, setDrainPump] = useState('none'); 
  const [drainHoseLength, setDrainHoseLength] = useState(0); 
  const [drainPVCLength, setDrainPVCLength] = useState(0); 

  const [removalType, setRemovalType] = useState('none');
  
  // 권역이동운반비 상태
  const [transportMoveType, setTransportMoveType] = useState('none');
  const [transportType, setTransportType] = useState('none');

  const [airGuideCount, setAirGuideCount] = useState(0); 
  
  const [isCeilingWork, setIsCeilingWork] = useState(false); 
  const [floorSleeveCount, setFloorSleeveCount] = useState(0); 
  const [inspectionHoleCount, setInspectionHoleCount] = useState(0); 
  const [isPrePiping, setIsPrePiping] = useState(false); 

  // 스마트링크 상태
  const [smartLinkCount, setSmartLinkCount] = useState(0);
  const [isSmartLink, setIsSmartLink] = useState(false); 

  const [totalPrice, setTotalPrice] = useState(0);
  const [breakdown, setBreakdown] = useState({
    base: 0,
    pipe: 0,
    electric: 0,
    others: 0
  });
  const [isNegotiable, setIsNegotiable] = useState(false); 
  
  const [copySuccess, setCopySuccess] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  // 모바일 여부 감지
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // --- 테마 설정 ---
  const theme = {
    cooling: {
      bgApp: 'bg-blue-50', 
      bgHeaderIcon: 'bg-blue-600',
      textPrimary: 'text-blue-600',
      textDark: 'text-blue-900',
      borderActive: 'border-blue-500',
      bgActive: 'bg-blue-50',
      ringActive: 'ring-blue-500',
      textActive: 'text-blue-700',
      accentColor: 'accent-blue-600', 
      buttonSolid: 'bg-blue-600 hover:bg-blue-700',
      alertIcon: 'text-blue-500',
      alertBg: 'bg-blue-50',
      alertBorder: 'border-blue-100',
      checkIcon: 'bg-blue-600 border-blue-600',
    },
    heating: {
      bgApp: 'bg-orange-50', 
      bgHeaderIcon: 'bg-orange-500',
      textPrimary: 'text-orange-600',
      textDark: 'text-orange-900',
      borderActive: 'border-orange-500',
      bgActive: 'bg-orange-50',
      ringActive: 'ring-orange-500',
      textActive: 'text-orange-700',
      accentColor: 'accent-orange-500', 
      buttonSolid: 'bg-orange-600 hover:bg-orange-700',
      alertIcon: 'text-orange-500',
      alertBg: 'bg-orange-50',
      alertBorder: 'border-orange-100',
      checkIcon: 'bg-orange-500 border-orange-500',
    },
    used: {
      bgApp: 'bg-green-50', 
      bgHeaderIcon: 'bg-green-600',
      textPrimary: 'text-green-600',
      textDark: 'text-green-900',
      borderActive: 'border-green-500',
      bgActive: 'bg-green-50',
      ringActive: 'ring-green-500',
      textActive: 'text-green-700',
      accentColor: 'accent-green-600', 
      buttonSolid: 'bg-green-600 hover:bg-green-700',
      alertIcon: 'text-green-500',
      alertBg: 'bg-green-50',
      alertBorder: 'border-green-100',
      checkIcon: 'bg-green-600 border-green-600',
    }
  };

  const t = theme[acMode]; 

  // --- 기기 타입 목록 ---
  const AC_TYPES = {
    cooling: [
      { id: 'wall', label: '벽걸이', pipePrice: 20000 },
      { id: 'stand', label: '스탠드', pipePrice: 22000 },
      { id: '2in1', label: '2in1', pipePrice: 0 }, 
      { id: 'allinone', label: '올인원(벽)', pipePrice: 22000 },
      { id: 'commercial', label: '업소용', pipePrice: 27000 },
      { id: 'large', label: '대형(40평 초과)', pipePrice: 40000 },
      { id: 'ceiling', label: '천장형', pipePrice: 30000 },
    ],
    heating: [
      { id: 'wall', label: '벽걸이', pipePrice: 22000 },
      { id: 'stand', label: '스탠드', pipePrice: 27000 },
      { id: 'allinone', label: '올인원(벽)', pipePrice: 22000 },
      { id: 'large', label: '대형(40평 초과)', pipePrice: 40000 },
      { id: 'ceiling', label: '천장형', pipePrice: 30000 },
    ],
    used: [
      { id: 'wall_cool', label: '벽걸이(냉방)', pipePrice: 20000 },
      { id: 'wall_heat', label: '벽걸이(냉난방)', pipePrice: 22000 },
      { id: 'stand_home', label: '스탠드(가정용)', pipePrice: 22000 },
      { id: 'stand_comm', label: '스탠드(업소용)', pipePrice: 27000 },
      { id: '2in1', label: '2in1(벽걸이/스탠드)', pipePrice: 0 }, 
      { id: 'allinone_cool', label: '올인원(벽/냉방)', pipePrice: 22000 },
      { id: 'allinone_heat', label: '올인원(벽/냉난방)', pipePrice: 22000 },
      { id: 'large', label: '대형(40평 초과)', pipePrice: 40000 },
      { id: 'ceiling', label: '천장형', pipePrice: 30000 },
    ]
  };

  // --- 가격 정책 데이터 ---
  const PRICING = {
    base: { 
      cooling: { wall: 120000, stand: 150000, '2in1': 200000, allinone: 150000, commercial: 600000, large: 750000, ceiling: 600000 },
      heating: { wall: 300000, stand: 600000, allinone: 150000, large: 750000, ceiling: 600000 },
      used: { wall_cool: 150000, wall_heat: 170000, stand_home: 180000, stand_comm: 230000, '2in1': 280000, allinone_cool: 150000, allinone_heat: 200000, large: 500000, ceiling: 600000 }
    },
    pipePerMeter: { 
      cooling: { wall: 20000, stand: 22000, '2in1_wall': 20000, '2in1_stand': 22000 },
      heating: { wall: 22000, stand: 27000, '2in1_wall': 22000, '2in1_stand': 25000 },
      used: { wall_cool: 20000, wall_heat: 22000, stand_home: 22000, stand_comm: 27000, '2in1_wall': 20000, '2in1_stand': 22000, allinone_cool: 22000, allinone_heat: 22000, large: 40000, ceiling: 30000 }
    },
    buried: { base: 100000 },
    options: { holeGeneral: 30000, holeDifficult: 50000, holeSpecial: 70000, specialPipe: 30000, airGuide: 50000, ceilingWork: 100000, floorSleeve: 50000, inspectionHole: 100000, prePiping: 100000, smartLink: 30000 },
    rack: { new_900: 110000, new_1000: 150000, new_1100: 200000, new_dual: 180000, new_custom: 0, exist_small: 70000, exist_large: 90000, danger_small: 30000, danger_medium: 50000, danger_large: 100000, base_pvc: 50000, base_angle: 100000 },
    gasOptions: { none: 0, cool_under5: 30000, cool_over5: 50000, heat_under5: 50000, heat_over5: 70000, over10: 0 },
    electric: { cable: { under40: 10000, over40: 15000 }, breaker: { '1p30a': 50000, '1p50a': 70000, '3p30a': 100000, '3p50a': 150000, 'box_1p': 50000, 'box_3p': 100000, 'connection_1p': 40000, 'connection_3p': 70000 } },
    drain: { pump: { 'std_4m': 100000, 'std_6m': 120000, 'std_8m': 150000, 'std_over10': 200000, 'low_noise': 200000, 'own': 70000 }, hose: 4000, pvc: 10000 },
    removal: { none: 0, basic: 0, wall: 30000, stand: 50000, large: 100000 },
    transportMove: { none: 0, same_dong: 0, same_gu: 30000, under_30km: 50000, over_30km: 0 },
    transport: { none: 0, wall_low: 30000, stand_low: 50000, high_floor: 100000, manual_100m: 30000 }
  };

  // --- 자동 설정 및 계산 로직 ---
  useEffect(() => {
    const currentList = AC_TYPES[acMode].map(item => item.id);
    if (!currentList.includes(acType)) setAcType(AC_TYPES[acMode][0].id);
  }, [acMode]);

  useEffect(() => {
    if (installType === 'buried') {
      const perSet = (acType === '2in1' || acType === '2in1_wall' || acType === '2in1_stand') ? 2 : 1;
      setBuriedCount(perSet * acCount);
    }
  }, [acType, acMode, installType, acCount]);

  const updateCount = (stateSetter, key, delta) => {
    stateSetter(prev => ({ ...prev, [key]: Math.max(0, (prev[key] || 0) + delta) }));
  };

  useEffect(() => {
    const unitBasePrice = PRICING.base[acMode][acType] || 0;
    const basePrice = unitBasePrice * acCount;

    let pipePrice = 0;
    if (installType === 'general') {
      if (acType === '2in1') {
        const wallUnitPrice = PRICING.pipePerMeter[acMode]['2in1_wall'] || PRICING.pipePerMeter[acMode]['wall'];
        const standUnitPrice = PRICING.pipePerMeter[acMode]['2in1_stand'] || PRICING.pipePerMeter[acMode]['stand'];
        pipePrice = (pipeLengthWall * wallUnitPrice) + (pipeLength * standUnitPrice);
      } else {
        const typeInfo = AC_TYPES[acMode].find(item => item.id === acType);
        const unitPrice = typeInfo ? typeInfo.pipePrice : 0;
        pipePrice = pipeLength * unitPrice;
      }
    }

    const specialPipePrice = specialPipeLength * PRICING.options.specialPipe;
    let buriedPrice = installType === 'buried' ? buriedCount * PRICING.buried.base : 0;
    const holePrice = (holeCountGeneral * PRICING.options.holeGeneral) + (holeCountDifficult * PRICING.options.holeDifficult) + (holeCountSpecial * PRICING.options.holeSpecial);

    let rackPrice = 0;
    let negotiableFlag = false;
    Object.keys(rackCounts).forEach(key => {
      rackPrice += (rackCounts[key] || 0) * PRICING.rack[key];
      if (key === 'new_custom' && rackCounts[key] > 0) negotiableFlag = true;
    });

    let gasPrice = 0;
    Object.keys(gasCounts).forEach(key => {
      gasPrice += (gasCounts[key] || 0) * PRICING.gasOptions[key];
      if (key === 'over10' && gasCounts[key] > 0) negotiableFlag = true;
    });

    const cablePrice = powerCableLength * PRICING.electric.cable[powerCableType];
    let breakerPriceTotal = 0;
    Object.keys(breakerCounts).forEach(key => {
      breakerPriceTotal += (breakerCounts[key] || 0) * PRICING.electric.breaker[key];
    });
    const electricPrice = cablePrice + breakerPriceTotal;

    let pumpPriceTotal = 0;
    Object.keys(drainPumpCounts).forEach(key => {
      pumpPriceTotal += (drainPumpCounts[key] || 0) * PRICING.drain.pump[key];
    });
    const drainPrice = pumpPriceTotal + (drainHoseLength * PRICING.drain.hose) + (drainPVCLength * PRICING.drain.pvc);

    const removalPrice = PRICING.removal[removalType];
    let transportMovePrice = 0;
    if (acMode === 'used') {
        transportMovePrice = PRICING.transportMove[transportMoveType];
        if (transportMoveType === 'over_30km') negotiableFlag = true;
    }
    const transportPrice = PRICING.transport[transportType];
    const airGuidePrice = airGuideCount * PRICING.options.airGuide;
    const ceilingWorkPrice = isCeilingWork ? PRICING.options.ceilingWork : 0;
    const floorSleevePrice = floorSleeveCount * PRICING.options.floorSleeve;
    const inspectionHolePrice = inspectionHoleCount * PRICING.options.inspectionHole;
    const prePipingPrice = isPrePiping ? PRICING.options.prePiping : 0;
    let smartLinkPrice = acMode === 'used' ? smartLinkCount * PRICING.options.smartLink : (isSmartLink ? PRICING.options.smartLink : 0);

    const othersTotal = holePrice + airGuidePrice + ceilingWorkPrice + floorSleevePrice + inspectionHolePrice + prePipingPrice + smartLinkPrice;
    const total = basePrice + pipePrice + specialPipePrice + buriedPrice + rackPrice + gasPrice + electricPrice + drainPrice + removalPrice + transportPrice + transportMovePrice + othersTotal;

    setIsNegotiable(negotiableFlag);
    setTotalPrice(total);
    setBreakdown({ base: basePrice, pipe: pipePrice + specialPipePrice + buriedPrice, electric: electricPrice, others: rackPrice + gasPrice + drainPrice + removalPrice + transportPrice + transportMovePrice + othersTotal });
  }, [acMode, acType, acCount, installType, pipeLength, pipeLengthWall, specialPipeLength, holeCountGeneral, holeCountDifficult, holeCountSpecial, rackCounts, gasCounts, powerCableType, powerCableLength, breakerCounts, drainPumpCounts, drainHoseLength, drainPVCLength, removalType, transportType, transportMoveType, airGuideCount, isCeilingWork, floorSleeveCount, inspectionHoleCount, isPrePiping, buriedCount, isSmartLink, smartLinkCount]);

  const formatCurrency = (amount) => new Intl.NumberFormat('ko-KR').format(amount);
  const getAcTypeLabel = () => AC_TYPES[acMode].find(item => item.id === acType)?.label || '';

  const handleReset = () => {
    setAcType(AC_TYPES[acMode][0].id); setAcCount(1); setInstallType('general'); setPipeLength(0); setPipeLengthWall(0); setBuriedCount(1); setSpecialPipeLength(0);
    setHoleCountGeneral(0); setHoleCountDifficult(0); setHoleCountSpecial(0);
    setRackCounts({ new_900: 0, new_1000: 0, new_1100: 0, new_dual: 0, new_custom: 0, exist_small: 0, exist_large: 0, danger_small: 0, danger_medium: 0, danger_large: 0, base_pvc: 0, base_angle: 0 });
    setGasCounts({ cool_under5: 0, cool_over5: 0, heat_under5: 0, heat_over5: 0, over10: 0 });
    setPowerCableType('under40'); setPowerCableLength(0);
    setBreakerCounts({ '1p30a': 0, '1p50a': 0, '3p30a': 0, '3p50a': 0, 'box_1p': 0, 'box_3p': 0, 'connection_1p': 0, 'connection_3p': 0 });
    setDrainPumpCounts({ 'std_4m': 0, 'std_6m': 0, 'std_8m': 0, 'std_over10': 0, 'low_noise': 0, 'own': 0 });
    setDrainHoseLength(0); setDrainPVCLength(0);
    setRemovalType('none'); setTransportMoveType('none'); setTransportType('none');
    setAirGuideCount(0); setIsCeilingWork(false); setFloorSleeveCount(0); setInspectionHoleCount(0); setIsPrePiping(false); setIsSmartLink(false); setSmartLinkCount(0);
    setShowReceiptModal(false);
  };

  const getGasOptionsList = () => {
    const commonOptions = [{ id: 'over10', label: '10m 초과', price: 0, text: '별도 협의' }];
    if (acMode === 'used') return [{ id: 'cool_under5', label: '냉방전용 5m 이하', price: 30000 }, { id: 'cool_over5', label: '냉방전용 5m 초과', price: 50000 }, { id: 'heat_under5', label: '냉난방기 5m 이하', price: 50000 }, { id: 'heat_over5', label: '냉난방기 5m 초과', price: 70000 }, ...commonOptions];
    return acMode === 'cooling' ? [{ id: 'cool_under5', label: '냉방전용 5m 이하', price: 30000 }, { id: 'cool_over5', label: '냉방전용 5m 초과', price: 50000 }, ...commonOptions] : [{ id: 'heat_under5', label: '냉난방기 5m 이하', price: 50000 }, { id: 'heat_over5', label: '냉난방기 5m 초과', price: 70000 }, ...commonOptions];
  };

  const copyToClipboard = () => {
    const text = `
[에어컨 설치 예상 견적]
작성일: ${today}

■ 설치 정보
- 기기: ${acMode === 'cooling' ? '냉방전용' : acMode === 'heating' ? '냉난방기' : '중고(이전설치)'} / ${getAcTypeLabel()} (${acCount}대)
- 배관: ${installType === 'general' ? `일반배관 (추가 ${pipeLength}m${acType === '2in1' ? `, 벽걸이 ${pipeLengthWall}m` : ''})` : `매립배관 (${buriedCount}세트)`}

■ 상세 견적
- 기본설치비: ${formatCurrency(breakdown.base)}원
- 배관비용: ${formatCurrency(breakdown.pipe)}원
- 전기공사: ${formatCurrency(breakdown.electric)}원
- 기타작업: ${formatCurrency(breakdown.others)}원 (철거/운반/앵글 등 포함)

■ 총 예상 견적: ${formatCurrency(totalPrice)}원 ${isNegotiable ? '(+별도협의)' : ''}

* 위 견적은 예상 금액이며 현장 상황에 따라 달라질 수 있습니다.
    `.trim();

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; textArea.style.left = "-9999px"; textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) { setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); }
    } catch (err) { console.error('Fallback copy failed', err); }
    document.body.removeChild(textArea);
  };

  const handlePrint = () => {
     setShowReceiptModal(true);
  };

  return (
    <div className={`min-h-screen ${t.bgApp} text-slate-800 font-sans transition-colors duration-500`}>
      
      {/* -------------------- [화면 UI] (인쇄 시 숨김) -------------------- */}
      <div className="print:hidden pb-64">
        {/* Header */}
        <header className="bg-white sticky top-0 z-20 border-b border-slate-200 shadow-sm transition-colors">
          <div className="max-w-md mx-auto px-4 pt-3 pb-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`${t.bgHeaderIcon} p-1.5 rounded-lg text-white transition-colors duration-300`}>
                  <Calculator size={18} />
                </div>
                <h1 className="font-bold text-base text-slate-800">에어컨 설치 견적 (상세)</h1>
              </div>
              <button 
                type="button"
                onClick={handleReset}
                className={`text-slate-500 hover:${t.textPrimary} transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-1`}
                aria-label="초기화"
              >
                <RotateCcw size={16} />
                <span className="text-xs font-medium">초기화</span>
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <a href="https://mkt.shopping.naver.com/link/69446d2e8f200d106e1d7869" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#03C75A] text-white hover:opacity-90 transition-opacity"><span className="font-bold text-xs">스마트</span><span className="text-[10px]">스토어</span></a>
              <a href="https://link.coupang.com/re/SHOPPAGESHAREVID?pageKey=A00146205&lptag=A00146205&sourceType2=brandstore_share&title=%EC%A6%90%EA%B1%B0%EC%9B%80%EC%9D%84%EB%8B%B4%EB%8B%A4%E2%98%85%EB%8B%A4%EB%8B%B4%EC%95%84&destUrl=https%3A%2F%2Fshop.coupang.com%2Fvid%2FA00146205%3Fsource%3Dbrandstore_share" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#E60012] text-white hover:opacity-90 transition-opacity"><span className="font-bold text-xs">쿠팡</span><span className="text-[10px]">Coupang</span></a>
              <a href="http://minishop.gmarket.co.kr/dadama2017" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#00AA30] text-white hover:opacity-90 transition-opacity"><span className="font-bold text-xs">지마켓</span><span className="text-[10px]">Gmarket</span></a>
              <a href="https://shop.11st.co.kr/m/dadama" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#FF0000] text-white hover:opacity-90 transition-opacity"><span className="font-bold text-xs">11번가</span><span className="text-[10px]">11st</span></a>
              <a href="https://www.lotteon.com/p/display/seller/sellerShop/LD479727" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#C4000D] text-white hover:opacity-90 transition-opacity"><span className="font-bold text-xs">롯데온</span><span className="text-[10px]">LotteON</span></a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-md mx-auto p-4 space-y-6">
           {/* 1. 기본 설정 */}
           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 transition-all">
             <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
               <Wind size={16} /> 기기 정보 <span className="text-[11px] font-normal text-slate-400 ml-1 tracking-normal">(기본배관 5m 포함)</span>
             </h2>
             <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
               <button onClick={() => { setAcMode('cooling'); setGasCounts({ cool_under5: 0, cool_over5: 0, heat_under5: 0, heat_over5: 0, over10: 0 }); }} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${acMode === 'cooling' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><Snowflake size={14} /> 냉방전용</button>
               <button onClick={() => { setAcMode('heating'); setGasCounts({ cool_under5: 0, cool_over5: 0, heat_under5: 0, heat_over5: 0, over10: 0 }); }} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${acMode === 'heating' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><Flame size={14} /> 냉난방기</button>
               <button onClick={() => { setAcMode('used'); setGasCounts({ cool_under5: 0, cool_over5: 0, heat_under5: 0, heat_over5: 0, over10: 0 }); }} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${acMode === 'used' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><Recycle size={14} /> 중고(이전)</button>
             </div>
             <div className="grid grid-cols-2 gap-2 mb-4">
               {AC_TYPES[acMode].map((item) => (
                 <button key={item.id} onClick={() => setAcType(item.id)} className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all text-left relative ${acType === item.id ? `${t.borderActive} ${t.bgActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-100 text-slate-600 hover:bg-slate-50'}`}>
                   <span className="text-lg font-bold">{item.label}</span>
                   {item.id !== '2in1' && item.pipePrice > 0 && <span className="block text-[10px] text-slate-400 mt-1 font-normal">배관 {formatCurrency(item.pipePrice)}원/m</span>}
                   {item.id === '2in1' && <span className="block text-[10px] text-slate-400 mt-1 font-normal">벽걸이/스탠드</span>}
                 </button>
               ))}
             </div>
             <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-sm font-medium text-slate-600">수량(설치대수)</span>
                <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200">
                  <button onClick={() => setAcCount(Math.max(1, acCount - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button>
                  <span className={`font-bold text-lg w-8 text-center ${t.textPrimary}`}>{acCount}대</span>
                  <button onClick={() => setAcCount(acCount + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button>
                </div>
             </div>
           </section>

           {/* 2. 배관 설정 */}
           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all">
             <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><Ruler size={16} /> 배관 방식</h2>
             <div className="flex gap-3 mb-6">
               <button onClick={() => setInstallType('general')} className={`flex-1 py-3 px-4 rounded-xl border text-left transition-all ${installType === 'general' ? `${t.borderActive} ${t.bgActive} ring-1 ${t.ringActive}` : 'border-slate-200'}`}><div className="font-bold text-sm">일반 배관</div><div className="text-xs text-slate-500 mt-1">노출 설치</div></button>
               <button onClick={() => setInstallType('buried')} className={`flex-1 py-3 px-4 rounded-xl border text-left transition-all ${installType === 'buried' ? `${t.borderActive} ${t.bgActive} ring-1 ${t.ringActive}` : 'border-slate-200'}`}><div className="font-bold text-sm">매립 배관</div><div className="text-xs text-slate-500 mt-1">벽 매립/기존배관사용</div></button>
             </div>
             {installType === 'general' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                 {acType === '2in1' ? (
                   <>
                     <div><div className="flex justify-between mb-2"><span className="text-slate-700 font-medium text-sm">스탠드 배관</span><span className={`${t.textPrimary} font-bold`}>{pipeLength}m</span></div><input type="range" min="0" max="50" step="1" value={pipeLength} onChange={(e) => setPipeLength(parseInt(e.target.value))} className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${t.accentColor}`} /><div className="text-xs text-slate-400 mt-1 text-right">단가: {formatCurrency(PRICING.pipePerMeter[acMode]['2in1_stand'] || PRICING.pipePerMeter[acMode]['stand'])}원/m</div></div>
                     <div><div className="flex justify-between mb-2"><span className="text-slate-700 font-medium text-sm">벽걸이 배관</span><span className={`${t.textPrimary} font-bold`}>{pipeLengthWall}m</span></div><input type="range" min="0" max="50" step="1" value={pipeLengthWall} onChange={(e) => setPipeLengthWall(parseInt(e.target.value))} className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${t.accentColor}`} /><div className="text-xs text-slate-400 mt-1 text-right">단가: {formatCurrency(PRICING.pipePerMeter[acMode]['2in1_wall'] || PRICING.pipePerMeter[acMode]['wall'])}원/m</div></div>
                   </>
                 ) : (
                   <div><div className="flex justify-between mb-2"><span className="text-slate-700 font-medium text-sm">추가 배관</span><span className={`${t.textPrimary} font-bold`}>{pipeLength}m</span></div><input type="range" min="0" max="50" step="1" value={pipeLength} onChange={(e) => setPipeLength(parseInt(e.target.value))} className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${t.accentColor}`} /><div className={`bg-slate-50 p-3 rounded-lg flex items-center gap-2 text-xs text-slate-600 mt-3`}><AlertCircle size={14} className={`${t.alertIcon} shrink-0`} /><span>추가 배관 단가: 1m당 {formatCurrency(AC_TYPES[acMode].find(i => i.id === acType)?.pipePrice || 0)}원</span></div></div>
                 )}
               </div>
             )}
             {installType === 'buried' && (
               <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className={`p-4 rounded-lg ${t.alertBg} border ${t.alertBorder} flex items-start gap-3`}><CheckCircle2 size={18} className={`${t.textPrimary} mt-0.5 shrink-0`} /><div className="text-sm"><span className="block font-bold text-slate-700 mb-1">포함 내역</span><span className="text-slate-600">용접 / 배관세척 / 냉매보충</span></div></div>
                  <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between"><div className="text-sm text-slate-600 flex flex-col"><span className="font-medium">매립배관 수량 (실내기)</span><span className="text-xs text-slate-400">대당 100,000원</span></div><div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200"><button onClick={() => setBuriedCount(Math.max(1, buriedCount - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button><span className={`font-bold text-lg w-6 text-center ${t.textPrimary}`}>{buriedCount}</span><button onClick={() => setBuriedCount(buriedCount + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button></div></div>
               </div>
             )}
             <div className="pt-4 border-t border-slate-100 mt-4"><div className="flex justify-between mb-1"><span className="text-sm font-medium text-slate-700">특수배관 (주름관)</span>{specialPipeLength > 0 && <span className={`text-xs font-bold ${t.textPrimary}`}>{specialPipeLength}m</span>}</div><input type="range" min="0" max="10" step="1" value={specialPipeLength} onChange={(e) => setSpecialPipeLength(parseInt(e.target.value))} className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${t.accentColor}`} /><div className="text-xs text-slate-400 mt-1 text-right">굴곡이 심한 곳 (m당 30,000원)</div></div>
             {acMode === 'used' && (
               <div className="pt-4 border-t border-slate-100 mt-4 animate-in fade-in slide-in-from-top-2">
                  <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <Link size={18} className="text-slate-500" />
                       <div className="text-sm text-slate-600 flex flex-col">
                         <span className="font-medium">스마트링크(삼성전자)</span>
                         <span className="text-xs text-slate-400">필수 / 실내기 대당 30,000원</span>
                       </div>
                     </div>
                     <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200">
                       <button onClick={() => setSmartLinkCount(Math.max(0, smartLinkCount - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button>
                       <span className={`font-bold text-lg w-6 text-center ${t.textPrimary}`}>{smartLinkCount}</span>
                       <button onClick={() => setSmartLinkCount(smartLinkCount + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button>
                     </div>
                  </div>
               </div>
             )}
           </section>

           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all">
             <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><Droplets size={16} /> <span>냉매(가스) 충전</span><span className="text-[11px] font-normal text-slate-400 ml-1 tracking-normal">(배관 추가시 적용)</span></h2>
             <div className="space-y-2">
               {getGasOptionsList().map((opt) => (
                  <div key={opt.id} className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all ${gasCounts[opt.id] > 0 ? `${t.borderActive} ${t.bgActive} ring-1 ${t.ringActive}` : 'border-slate-200 bg-white'}`}>
                    <div className="flex flex-col flex-1 pr-2"><span className={`font-medium ${gasCounts[opt.id] > 0 ? t.textActive : 'text-slate-600'}`}>{opt.label}</span><span className="text-xs text-slate-400 font-normal">{opt.text ? opt.text : `${formatCurrency(opt.price)}원`}</span></div>
                    <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0"><button onClick={() => updateCount(setGasCounts, opt.id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button><span className={`font-bold w-4 text-center ${t.textPrimary}`}>{gasCounts[opt.id]}</span><button onClick={() => updateCount(setGasCounts, opt.id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button></div>
                  </div>
               ))}
             </div>
           </section>

           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all">
             <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><Home size={16} /> 실외기 설치</h2>
             <div className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                   <div className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-1"><Wrench size={14} className="text-blue-500" /> 신규 앵글 제작</div>
                   <div className="space-y-1">
                   {[{ id: 'new_900', label: '900mm(벽걸이 9평이하)', price: 110000 }, { id: 'new_1000', label: '1000mm(벽/스 16평이하)', price: 150000 }, { id: 'new_1100', label: '1100mm(중대형/40평이하)', price: 200000 }, { id: 'new_dual', label: '2단앵글', price: 180000 }, { id: 'new_custom', label: '제작앵글', price: 0, text: '별도 협의' }].map((opt) => (
                     <div key={opt.id} className={`w-full flex items-center justify-between p-2 rounded-lg bg-white border ${rackCounts[opt.id] > 0 ? `${t.borderActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 text-slate-600'}`}>
                       <div className="flex flex-col flex-1 pr-2"><span className={`font-medium text-sm`}>{opt.label}</span><span className="text-xs font-normal opacity-70 mt-0.5 block">{opt.text ? opt.text : `${formatCurrency(opt.price)}원`}</span></div>
                       <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 shrink-0"><button onClick={() => updateCount(setRackCounts, opt.id, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">-</button><span className={`font-bold w-4 text-center text-sm`}>{rackCounts[opt.id]}</span><button onClick={() => updateCount(setRackCounts, opt.id, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">+</button></div>
                     </div>
                   ))}
                   </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                   <div className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-1"><RotateCcw size={14} className="text-green-500" /> 앵글 보유 (재설치)</div>
                   <div className="space-y-1">
                   {[{ id: 'exist_small', label: '900mm 이하', price: 70000 }, { id: 'exist_large', label: '900mm 초과', price: 90000 }].map((opt) => (
                     <div key={opt.id} className={`w-full flex items-center justify-between p-2 rounded-lg bg-white border ${rackCounts[opt.id] > 0 ? `${t.borderActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 text-slate-600'}`}>
                       <div className="flex flex-col flex-1 pr-2"><span className={`font-medium text-sm`}>{opt.label}</span><span className="text-xs font-normal opacity-70 mt-0.5 block">{formatCurrency(opt.price)}원</span></div>
                       <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 shrink-0"><button onClick={() => updateCount(setRackCounts, opt.id, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">-</button><span className={`font-bold w-4 text-center text-sm`}>{rackCounts[opt.id]}</span><button onClick={() => updateCount(setRackCounts, opt.id, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">+</button></div>
                     </div>
                   ))}
                   </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                   <div className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-1"><AlertCircle size={14} className="text-red-500" /> 위험수당 (2층이상)</div>
                   <div className="space-y-1">
                   {[{ id: 'danger_small', label: '벽걸이 (9평 이하)', price: 30000 }, { id: 'danger_medium', label: '벽걸이/스탠드 (16평 이하)', price: 50000 }, { id: 'danger_large', label: '중대형 (40평 이하)', price: 100000 }].map((opt) => (
                     <div key={opt.id} className={`w-full flex items-center justify-between p-2 rounded-lg bg-white border ${rackCounts[opt.id] > 0 ? `${t.borderActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 text-slate-600'}`}>
                       <div className="flex flex-col flex-1 pr-2"><span className={`font-medium text-sm`}>{opt.label}</span><span className="text-xs font-normal opacity-70 mt-0.5 block">{formatCurrency(opt.price)}원</span></div>
                       <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 shrink-0"><button onClick={() => updateCount(setRackCounts, opt.id, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">-</button><span className={`font-bold w-4 text-center text-sm`}>{rackCounts[opt.id]}</span><button onClick={() => updateCount(setRackCounts, opt.id, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">+</button></div>
                     </div>
                   ))}
                   </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                   <div className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-1"><CheckCircle2 size={14} className="text-slate-500" /> 바닥받침대 (베이스)</div>
                   <div className="space-y-1">
                   {[{ id: 'base_pvc', label: 'PVC베이스', price: 50000 }, { id: 'base_angle', label: '앵글형베이스', price: 100000 }].map((opt) => (
                     <div key={opt.id} className={`w-full flex items-center justify-between p-2 rounded-lg bg-white border ${rackCounts[opt.id] > 0 ? `${t.borderActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 text-slate-600'}`}>
                       <div className="flex flex-col flex-1 pr-2"><span className={`font-medium text-sm`}>{opt.label}</span><span className="text-xs font-normal opacity-70 mt-0.5 block">{formatCurrency(opt.price)}원</span></div>
                       <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 shrink-0"><button onClick={() => updateCount(setRackCounts, opt.id, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">-</button><span className={`font-bold w-4 text-center text-sm`}>{rackCounts[opt.id]}</span><button onClick={() => updateCount(setRackCounts, opt.id, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">+</button></div>
                     </div>
                   ))}
                   </div>
                </div>
             </div>
           </section>

           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all"><h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><Drill size={16} /> 타공 (벽뚫기)</h2><div className="space-y-3">
                <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between"><div className="text-sm text-slate-600 flex flex-col"><span className="font-medium">일반 타공</span><span className="text-xs text-slate-400">30,000원 / 구</span></div><div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200"><button onClick={() => setHoleCountGeneral(Math.max(0, holeCountGeneral - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button><span className={`font-bold text-lg w-6 text-center ${t.textPrimary}`}>{holeCountGeneral}</span><button onClick={() => setHoleCountGeneral(holeCountGeneral + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button></div></div>
                <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between"><div className="text-sm text-slate-600 flex flex-col"><span className="font-medium">난타공 (벽두께 30cm↑)</span><span className="text-xs text-slate-400">50,000원 / 구</span></div><div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200"><button onClick={() => setHoleCountDifficult(Math.max(0, holeCountDifficult - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button><span className={`font-bold text-lg w-6 text-center ${t.textPrimary}`}>{holeCountDifficult}</span><button onClick={() => setHoleCountDifficult(holeCountDifficult + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button></div></div>
                <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between"><div className="text-sm text-slate-600 flex flex-col"><span className="font-medium">특수 타공 (대리석/스텐 등)</span><span className="text-xs text-slate-400">70,000원 / 구</span></div><div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200"><button onClick={() => setHoleCountSpecial(Math.max(0, holeCountSpecial - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button><span className={`font-bold text-lg w-6 text-center ${t.textPrimary}`}>{holeCountSpecial}</span><button onClick={() => setHoleCountSpecial(holeCountSpecial + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button></div></div>
             </div></section>

           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all">
             <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><Zap size={16} /> 전기 공사</h2>
             <div className="space-y-4">
               <div><div className="flex justify-between items-end mb-2"><span className="text-sm font-medium text-slate-700">전원선 (m당)</span><span className={`${t.textPrimary} font-bold`}>{powerCableLength}m</span></div><div className="flex bg-slate-100 p-1 rounded-lg mb-3"><button onClick={() => setPowerCableType('under40')} className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${powerCableType === 'under40' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>40평 이하 (10,000원)</button><button onClick={() => setPowerCableType('over40')} className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${powerCableType === 'over40' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>40평 초과 (15,000원)</button></div><div className="flex items-center gap-3"><span className="text-xs text-slate-500 w-12">길이</span><input type="range" min="0" max="50" step="1" value={powerCableLength} onChange={(e) => setPowerCableLength(parseInt(e.target.value))} className={`flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${t.accentColor}`} /><span className="text-sm font-bold w-8 text-right">{powerCableLength}m</span></div></div>
               <div>
                 <div className="text-sm font-medium text-slate-700 mb-3">차단기 설치 (개당)</div>
                 <div className="mb-3">
                   <div className="text-sm font-bold text-slate-600 mb-2 ml-1 flex items-center gap-1"><Zap size={14} className="text-yellow-500 fill-yellow-500" /> 단상 (220V)</div>
                   <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                       <div className="space-y-1">
                         {[{ id: '1p30a', label: '30A 이하', price: 50000 }, { id: '1p50a', label: '50A 이하', price: 70000 }, { id: 'box_1p', label: '차단기함(PVC)', price: 50000 }, { id: 'connection_1p', label: '단상 전원결속', price: 40000 }].map((opt) => (
                           <div key={opt.id} className={`w-full flex items-center justify-between p-2 rounded-lg bg-white border ${breakerCounts[opt.id] > 0 ? `${t.borderActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 text-slate-600'}`}>
                             <div className="flex flex-col flex-1 pr-2"><span className={`font-medium text-sm`}>{opt.label}</span><span className="text-xs font-normal opacity-70 ml-6">{formatCurrency(opt.price)}원</span></div>
                             <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 shrink-0"><button onClick={() => updateCount(setBreakerCounts, opt.id, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">-</button><span className={`font-bold w-4 text-center text-sm`}>{breakerCounts[opt.id]}</span><button onClick={() => updateCount(setBreakerCounts, opt.id, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">+</button></div>
                           </div>
                         ))}
                       </div>
                   </div>
                 </div>
                 <div>
                   <div className="text-sm font-bold text-slate-600 mb-2 ml-1 flex items-center gap-1"><Zap size={14} className="text-red-500 fill-red-500" /> 삼상 (380V)</div>
                   <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                       <div className="space-y-1">
                         {[{ id: '3p30a', label: '30A 이하', price: 100000 }, { id: '3p50a', label: '50A 이하', price: 150000 }, { id: 'box_3p', label: '차단기함(PVC)', price: 100000 }, { id: 'connection_3p', label: '삼상 전원결속', price: 70000 }].map((opt) => (
                           <div key={opt.id} className={`w-full flex items-center justify-between p-2 rounded-lg bg-white border ${breakerCounts[opt.id] > 0 ? `${t.borderActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 text-slate-600'}`}>
                             <div className="flex flex-col flex-1 pr-2"><span className={`font-medium text-sm`}>{opt.label}</span><span className="text-xs font-normal opacity-70 ml-6">{formatCurrency(opt.price)}원</span></div>
                             <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 shrink-0"><button onClick={() => updateCount(setBreakerCounts, opt.id, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">-</button><span className={`font-bold w-4 text-center text-sm`}>{breakerCounts[opt.id]}</span><button onClick={() => updateCount(setBreakerCounts, opt.id, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-gray-200 rounded text-slate-500">+</button></div>
                           </div>
                         ))}
                       </div>
                   </div>
                 </div>
               </div>
             </div>
           </section>

           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all">
             <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><Waves size={16} /> 배수 설비</h2>
             <div className="space-y-4">
               <div><div className="text-sm font-medium text-slate-700 mb-2">배수 펌프 <span className="text-xs text-slate-400 font-normal ml-1">(자연 배수가 불가한 경우)</span></div><div className="space-y-1">{[{ id: 'std_4m', label: '기본형 4m', price: 100000 }, { id: 'std_6m', label: '기본형 6m', price: 120000 }, { id: 'std_8m', label: '기본형 8m', price: 150000 }, { id: 'std_over10', label: '기본형 10m 이상', price: 200000 }, { id: 'low_noise', label: '저소음 (8m 이하)', price: 200000 }, { id: 'own', label: '펌프 보유 (설치비)', price: 70000 }].map((opt) => (<div key={opt.id} className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all ${drainPumpCounts[opt.id] > 0 ? `${t.borderActive} ${t.bgActive} ring-1 ${t.ringActive}` : 'border-slate-200 bg-white'}`}><div className="flex flex-col flex-1 pr-2"><span className={`font-medium ${drainPumpCounts[opt.id] > 0 ? t.textActive : 'text-slate-600'}`}>{opt.label}</span><span className="text-xs text-slate-400 font-normal">{formatCurrency(opt.price)}원</span></div><div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0"><button onClick={() => updateCount(setDrainPumpCounts, opt.id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button><span className={`font-bold w-4 text-center ${t.textPrimary}`}>{drainPumpCounts[opt.id]}</span><button onClick={() => updateCount(setDrainPumpCounts, opt.id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button></div></div>))}</div></div>
               <div className="text-sm font-medium text-slate-700 mt-2">추가 드레인 <span className="text-xs text-slate-400 font-normal">(기본자재 3m 제공)</span></div>
               <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg"><div className="flex flex-col flex-1"><span className="text-xs text-slate-500 font-medium">물호스 (4,000원/m)</span><input type="range" min="0" max="30" step="1" value={drainHoseLength} onChange={(e) => setDrainHoseLength(parseInt(e.target.value))} className={`h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${t.accentColor}`} /></div><span className="text-sm font-bold w-12 text-right">{drainHoseLength}m</span></div>
               <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg"><div className="flex flex-col flex-1"><span className="text-xs text-slate-500 font-medium">PVC 드레인 (10,000원/m)</span><input type="range" min="0" max="20" step="1" value={drainPVCLength} onChange={(e) => setDrainPVCLength(parseInt(e.target.value))} className={`h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${t.accentColor}`} /></div><span className="text-sm font-bold w-12 text-right">{drainPVCLength}m</span></div>
             </div>
           </section>

           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all"><h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><ArrowRight size={16} /> 에어가이드 (바람막이)</h2><div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between"><div className="text-sm text-slate-600">설치 개수 <span className="text-xs text-slate-400">(구당 5만원)</span></div><div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200"><button onClick={() => setAirGuideCount(Math.max(0, airGuideCount - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button><span className={`font-bold text-lg w-6 text-center ${t.textPrimary}`}>{airGuideCount}</span><button onClick={() => setAirGuideCount(airGuideCount + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button></div></div></section>
           
           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all">
             <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
               <Trash2 size={16} /> 
               <span>철거 (기존 에어컨)</span>
               {acMode === 'used' && <span className="text-xs ml-1 font-normal text-slate-500">(철거비+이동운반비)</span>}
             </h2>
             
             <div className="space-y-1">
               {/* 철거 옵션들 */}
               {[{ id: 'none', label: '철거 없음', price: 0 }, { id: 'basic', label: '기본철거 (실외기 바닥)', price: 0, text: '수거조건무료' }, { id: 'wall', label: '벽걸이형 철거', price: 30000 }, { id: 'stand', label: '스탠드형 철거', price: 50000 }, { id: 'large', label: '중대형/천장형 철거', price: 100000 }].filter(opt => !(acMode === 'used' && opt.id === 'basic')).map((opt) => (
                 <button key={opt.id} onClick={() => setRemovalType(opt.id)} className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all text-left ${removalType === opt.id ? `${t.borderActive} ${t.bgActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}><div className="flex items-center gap-2 flex-1"><div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${removalType === opt.id ? `${t.checkIcon}` : 'border-slate-300 bg-white'}`}>{removalType === opt.id && <div className="w-2 h-2 bg-white rounded-full" />}</div><span className="font-medium">{opt.label}</span></div><span className="font-bold shrink-0">{opt.text ? opt.text : `${formatCurrency(opt.price)}원`}</span></button>
               ))}
               {acMode === 'used' && (
                 <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                   <div className="text-sm font-bold text-slate-700 mb-2 ml-1">권역이동운반비</div>
                   <div className="space-y-1">
                      {[{ id: 'none', label: '이동 없음' }, { id: 'same_dong', label: '같은동(리) 이동시 (무료)' }, { id: 'same_gu', label: '같은구(읍,면) 이동시 (3만원)' }, { id: 'under_30km', label: '30km 이하 (5만원)' }, { id: 'over_30km', label: '30km 이상 (별도협의)' }].map(opt => (
                        <div key={opt.id} onClick={() => setTransportMoveType(opt.id)} className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all cursor-pointer ${transportMoveType === opt.id ? `${t.borderActive} ${t.bgActive} ring-1 ${t.ringActive}` : 'border-slate-200 bg-white'}`}><div className="flex items-center gap-2"><div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${transportMoveType === opt.id ? `${t.checkIcon}` : 'border-slate-300'}`}>{transportMoveType === opt.id && <Check size={10} className="text-white" />}</div><span className={`font-medium ${transportMoveType === opt.id ? t.textActive : 'text-slate-600'}`}>{opt.label}</span></div></div>
                      ))}
                   </div>
                 </div>
               )}
             </div>
           </section>

           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all"><h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><Truck size={16} /> <span>운반비</span><span className="text-[11px] font-normal text-slate-400 ml-1 tracking-normal">(엘리베이터 없는 건물 3층부터 적용)</span></h2><div className="space-y-1">{[{ id: 'none', label: '해당 없음', price: 0 }, { id: 'wall_low', label: '층간운반 (벽걸이 3층이하)', price: 30000 }, { id: 'stand_low', label: '층간운반 (스탠드 3층이하)', price: 50000 }, { id: 'high_floor', label: '층간운반 (벽/스 3층초과)', price: 100000 }, { id: 'manual_100m', label: '도수운반 (100m이상)', price: 30000 }].map((opt) => (<button key={opt.id} onClick={() => setTransportType(opt.id)} className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all text-left ${transportType === opt.id ? `${t.borderActive} ${t.bgActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}><div className="flex items-center gap-2 flex-1"><div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${transportType === opt.id ? `${t.checkIcon}` : 'border-slate-300 bg-white'}`}>{transportType === opt.id && <div className="w-2 h-2 bg-white rounded-full" />}</div><span className="font-medium">{opt.label}</span></div><span className="font-bold shrink-0">{opt.price > 0 ? `${formatCurrency(opt.price)}원` : '0원'}</span></button>))}</div></section>
           <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 transition-all"><h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><HardHat size={16} /> 배관 작업</h2><div className="space-y-2"><button onClick={() => setIsPrePiping(!isPrePiping)} className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all text-left ${isPrePiping ? `${t.borderActive} ${t.bgActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}><div className="flex items-center gap-2 flex-1"><div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${isPrePiping ? `${t.checkIcon}` : 'border-slate-300 bg-white'}`}>{isPrePiping && <div className="w-2 h-2 bg-white rounded-full" />}</div><div className="flex flex-col items-start text-left"><span className="font-medium">선배관작업</span><span className="text-xs text-slate-400 font-normal">미리 배관 작업 필요시 출장비</span></div></div><span className="font-bold whitespace-nowrap shrink-0">100,000원</span></button><button onClick={() => setIsCeilingWork(!isCeilingWork)} className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all text-left ${isCeilingWork ? `${t.borderActive} ${t.bgActive} ${t.textActive} ring-1 ${t.ringActive}` : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}><div className="flex items-center gap-2 flex-1"><div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${isCeilingWork ? `${t.checkIcon}` : 'border-slate-300 bg-white'}`}>{isCeilingWork && <div className="w-2 h-2 bg-white rounded-full" />}</div><div className="flex flex-col items-start text-left"><span className="font-medium">천장작업</span><span className="text-xs text-slate-400 font-normal">천장 안으로 배관 작업시</span></div></div><span className="font-bold whitespace-nowrap shrink-0">100,000원</span></button><div className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all text-left ${floorSleeveCount > 0 ? `${t.borderActive} ${t.bgActive} ring-1 ${t.ringActive}` : 'border-slate-200 bg-white'}`}><div className="flex items-center gap-3"><div className="flex flex-col"><span className={`font-medium ${floorSleeveCount > 0 ? t.textActive : 'text-slate-600'}`}>바닥슬리브</span><span className="text-xs text-slate-400 font-normal">바닥 관로로 배관 작업시</span><span className="text-[10px] text-slate-400 mt-0.5">대당 50,000원</span></div></div><div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0"><button onClick={() => setFloorSleeveCount(Math.max(0, floorSleeveCount - 1))} className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button><span className={`font-bold w-4 text-center ${t.textPrimary}`}>{floorSleeveCount}</span><button onClick={() => setFloorSleeveCount(floorSleeveCount + 1)} className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button></div></div><div className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all text-left ${inspectionHoleCount > 0 ? `${t.borderActive} ${t.bgActive} ring-1 ${t.ringActive}` : 'border-slate-200 bg-white'}`}><div className="flex items-center gap-3"><div className="flex flex-col"><span className={`font-medium ${inspectionHoleCount > 0 ? t.textActive : 'text-slate-600'}`}>점검구</span><span className="text-xs text-slate-400 font-normal">구당 100,000원</span></div></div><div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0"><button onClick={() => setInspectionHoleCount(Math.max(0, inspectionHoleCount - 1))} className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">-</button><span className={`font-bold w-4 text-center ${t.textPrimary}`}>{inspectionHoleCount}</span><button onClick={() => setInspectionHoleCount(inspectionHoleCount + 1)} className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-600">+</button></div></div></div></section>

            {/* 12. 특수작업차 & 유료주차 (Information Only) */}
            <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4">
              <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><Truck size={16} /> 특수작업차 & 유료주차</h2>
              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>* 제품의 직접 운반이 어려워 특수 차량이 필요한 경우 사용 비용은 고객님 부담입니다. (사다리차 등)</p>
                <p>* 특수 차량에 탑승하여 작업이 필요한 경우 별도 위험 수당이 추가 발생됩니다.</p>
                <p>* 주차 공간이 없어 유료주차장 사용시 주차비는 고객님 부담입니다.</p>
              </div>
            </section>

             <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-4 mb-20">
              <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2"><Info size={16} /> 기타작업</h2>
              <div className="text-xs text-slate-600 leading-relaxed">위 목록에는 없지만 현장 설치 환경에 따른 추가 작업비와 인건비가 발생 될 수 있습니다. 방문 설치팀과 협의 바랍니다.</div>
            </section>
        </main>
      </div>

      {/* Footer 견적 합계 - 화면에만 표시 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] px-4 py-4 safe-area-bottom z-30 print:hidden">
        <div className="max-w-md mx-auto">
          {copySuccess && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-2 px-4 rounded-full shadow-lg transition-opacity duration-300">
              견적 내용이 복사되었습니다!
            </div>
          )}

          <div className="flex justify-between items-end mb-3 text-sm">
             <div className="text-slate-500 font-medium">
               {acMode === 'cooling' ? '냉방전용' : acMode === 'heating' ? '냉난방기' : '중고(이전)'} / {getAcTypeLabel()}
             </div>
             <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">총 예상 견적</div>
                <div className={`text-2xl font-bold ${t.textPrimary} leading-none`}>
                  {formatCurrency(totalPrice)}<span className="text-base font-normal text-slate-600 ml-1">원</span>
                  {isNegotiable && <span className="text-sm text-red-500 ml-1"> + 별도협의</span>}
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg mb-3">
             <div className="flex justify-between"><span>기본설치</span> <b>{formatCurrency(breakdown.base)}</b></div>
             <div className="flex justify-between"><span>추가배관</span> <b>{formatCurrency(breakdown.pipe)}</b></div>
             <div className="flex justify-between"><span>전기공사</span> <b>{formatCurrency(breakdown.electric)}</b></div>
             <div className="flex justify-between"><span>기타작업</span> <b>{formatCurrency(breakdown.others)}</b></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <button 
                type="button"
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
                onClick={copyToClipboard}
              >
                <Copy size={18} />
                견적 복사
              </button>
              <button 
                type="button"
                className={`text-white font-bold py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${t.buttonSolid}`}
                onClick={() => setShowReceiptModal(true)}
              >
                <Printer size={18} />
                견적서 저장
              </button>
          </div>
        </div>
      </div>

      {/* -------------------- [견적서 미리보기 모달] -------------------- */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* 모달 헤더 */}
            <div className="p-4 bg-gray-800 text-white flex justify-between items-center shrink-0">
               <div className="flex items-center gap-2 font-bold text-lg">
                 <FileText size={20} /> 견적서 미리보기
               </div>
               <button 
                 onClick={() => setShowReceiptModal(false)}
                 className="p-1 hover:bg-white/20 rounded-full transition-colors"
               >
                 <X size={24} />
               </button>
            </div>

            {/* 모달 내용 (스크롤 가능) */}
            <div className="p-8 overflow-y-auto bg-white flex-1" id="receipt-content">
                {/* 인쇄용 양식과 동일한 디자인 */}
                <div className="text-center mb-6 border-b-2 border-black pb-4">
                    <h2 className="text-3xl font-bold mb-4 text-black">에어컨 설치 예상 견적서</h2>
                    <div className="text-base text-gray-700 space-y-1">
                        <h3 className="text-xl font-bold mb-1">주식회사 다담아</h3>
                        <p>담당자: 010-7979-0499</p>
                        <p>이메일: dadama2017@naver.com</p>
                    </div>
                </div>
                
                <div className="flex justify-between text-sm mb-6 text-black">
                    <div>
                        <p><strong>작성일:</strong> {today}</p>
                        <p><strong>설치 모드:</strong> {acMode === 'cooling' ? '냉방전용' : acMode === 'heating' ? '냉난방기' : '중고(이전설치)'}</p>
                        <p><strong>기기 타입:</strong> {getAcTypeLabel()} ({acCount}대)</p>
                        <p><strong>배관 방식:</strong> {installType === 'general' ? '일반 배관' : '매립 배관'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold mt-4">총 견적: {formatCurrency(totalPrice)}원</p>
                        {isNegotiable && <p className="text-xs text-red-500 font-bold">* 별도 협의 항목 포함</p>}
                    </div>
                </div>

                <table className="w-full text-xs sm:text-sm border-collapse border border-gray-400 mb-8 text-black">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 p-2 text-left">항목</th>
                            <th className="border border-gray-400 p-2 text-right">내용/수량</th>
                            <th className="border border-gray-400 p-2 text-right">금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 기본 설치비 */}
                        <tr>
                            <td className="border border-gray-400 p-2">기본 설치비</td>
                            <td className="border border-gray-400 p-2 text-right">{acCount}대</td>
                            <td className="border border-gray-400 p-2 text-right">{formatCurrency(breakdown.base)}원</td>
                        </tr>
                        {/* 배관 */}
                        {pipeLength > 0 && (
                            <tr>
                                <td className="border border-gray-400 p-2">추가 배관</td>
                                <td className="border border-gray-400 p-2 text-right">{pipeLength}m</td>
                                <td className="border border-gray-400 p-2 text-right">{formatCurrency(pipeLength * (acType === '2in1' ? (PRICING.pipePerMeter[acMode]['2in1_stand'] || PRICING.pipePerMeter[acMode]['stand']) : (AC_TYPES[acMode].find(i => i.id === acType)?.pipePrice || 0)))}원</td>
                            </tr>
                        )}
                         {pipeLengthWall > 0 && (
                            <tr>
                                <td className="border border-gray-400 p-2">추가 배관 (벽걸이)</td>
                                <td className="border border-gray-400 p-2 text-right">{pipeLengthWall}m</td>
                                <td className="border border-gray-400 p-2 text-right">
                                    {formatCurrency(pipeLengthWall * (PRICING.pipePerMeter[acMode]['2in1_wall'] || PRICING.pipePerMeter[acMode]['wall']))}원
                                </td>
                            </tr>
                        )}
                        {specialPipeLength > 0 && (
                            <tr>
                                <td className="border border-gray-400 p-2">특수 배관 (주름관)</td>
                                <td className="border border-gray-400 p-2 text-right">{specialPipeLength}m</td>
                                <td className="border border-gray-400 p-2 text-right">{formatCurrency(specialPipeLength * 30000)}원</td>
                            </tr>
                        )}
                        {buriedCount > 0 && installType === 'buried' && (
                            <tr>
                                <td className="border border-gray-400 p-2">매립 배관 (용접/세척)</td>
                                <td className="border border-gray-400 p-2 text-right">{buriedCount}식</td>
                                <td className="border border-gray-400 p-2 text-right">{formatCurrency(buriedCount * 100000)}원</td>
                            </tr>
                        )}
                        {smartLinkCount > 0 && (
                            <tr>
                                <td className="border border-gray-400 p-2">스마트링크 (삼성)</td>
                                <td className="border border-gray-400 p-2 text-right">{smartLinkCount}개</td>
                                <td className="border border-gray-400 p-2 text-right">{formatCurrency(smartLinkCount * 30000)}원</td>
                            </tr>
                        )}
                         {/* 냉매 */}
                        {Object.keys(gasCounts).map(key => gasCounts[key] > 0 && (
                            <tr key={key}>
                                  <td className="border border-gray-400 p-2">냉매 추가 ({key.includes('under5') ? '5m이하' : key.includes('over10') ? '10m초과' : '5m초과'})</td>
                                  <td className="border border-gray-400 p-2 text-right">{gasCounts[key]}회</td>
                                  <td className="border border-gray-400 p-2 text-right">{key === 'over10' ? '별도협의' : formatCurrency(gasCounts[key] * PRICING.gasOptions[key]) + '원'}</td>
                            </tr>
                        ))}
                        {/* 실외기/앵글 */}
                          {Object.keys(rackCounts).map(key => rackCounts[key] > 0 && (
                            <tr key={key}>
                                  <td className="border border-gray-400 p-2">
                                    {key.includes('new') ? '신규 앵글' : key.includes('exist') ? '보유 앵글' : key.includes('danger') ? '위험 수당' : '바닥 베이스'}
                                    {key.includes('custom') && ' (주문제작)'}
                                  </td>
                                  <td className="border border-gray-400 p-2 text-right">{rackCounts[key]}개</td>
                                  <td className="border border-gray-400 p-2 text-right">{key === 'new_custom' ? '별도협의' : formatCurrency(rackCounts[key] * PRICING.rack[key]) + '원'}</td>
                            </tr>
                        ))}
                        {/* 타공 */}
                        {(holeCountGeneral > 0 || holeCountDifficult > 0 || holeCountSpecial > 0) && (
                              <tr>
                                <td className="border border-gray-400 p-2">타공 (일반/난타공/특수)</td>
                                <td className="border border-gray-400 p-2 text-right">{holeCountGeneral + holeCountDifficult + holeCountSpecial}구</td>
                                <td className="border border-gray-400 p-2 text-right">
                                    {formatCurrency(
                                        (holeCountGeneral * 30000) + (holeCountDifficult * 50000) + (holeCountSpecial * 70000)
                                    )}원
                                </td>
                              </tr>
                        )}
                        {/* 전기 */}
                        {powerCableLength > 0 && (
                            <tr>
                                <td className="border border-gray-400 p-2">전원선 ({powerCableType === 'under40' ? '40평↓' : '40평↑'})</td>
                                <td className="border border-gray-400 p-2 text-right">{powerCableLength}m</td>
                                <td className="border border-gray-400 p-2 text-right">{formatCurrency(powerCableLength * (powerCableType === 'under40' ? 10000 : 15000))}원</td>
                            </tr>
                        )}
                        {Object.keys(breakerCounts).map(key => breakerCounts[key] > 0 && (
                              <tr key={key}>
                                  <td className="border border-gray-400 p-2">차단기 작업</td>
                                  <td className="border border-gray-400 p-2 text-right">{breakerCounts[key]}개</td>
                                  <td className="border border-gray-400 p-2 text-right">{formatCurrency(breakerCounts[key] * PRICING.electric.breaker[key])}원</td>
                              </tr>
                        ))}
                        {/* 배수 */}
                        {Object.keys(drainPumpCounts).map(key => drainPumpCounts[key] > 0 && (
                              <tr key={key}>
                                  <td className="border border-gray-400 p-2">배수 펌프</td>
                                  <td className="border border-gray-400 p-2 text-right">{drainPumpCounts[key]}개</td>
                                  <td className="border border-gray-400 p-2 text-right">{formatCurrency(drainPumpCounts[key] * PRICING.drain.pump[key])}원</td>
                              </tr>
                        ))}
                        {(drainHoseLength > 0 || drainPVCLength > 0) && (
                            <tr>
                                  <td className="border border-gray-400 p-2">추가 드레인 (호스/PVC)</td>
                                  <td className="border border-gray-400 p-2 text-right">{drainHoseLength + drainPVCLength}m</td>
                                  <td className="border border-gray-400 p-2 text-right">{formatCurrency((drainHoseLength * 4000) + (drainPVCLength * 10000))}원</td>
                            </tr>
                        )}
                        {/* 철거/운반 */}
                        {removalType !== 'none' && removalType !== 'basic' && (
                            <tr>
                                <td className="border border-gray-400 p-2">철거비</td>
                                <td className="border border-gray-400 p-2 text-right">1식</td>
                                <td className="border border-gray-400 p-2 text-right">{formatCurrency(PRICING.removal[removalType])}원</td>
                            </tr>
                        )}
                        {transportMoveType !== 'none' && (
                              <tr>
                                <td className="border border-gray-400 p-2">권역 이동 운반비</td>
                                <td className="border border-gray-400 p-2 text-right">1식</td>
                                <td className="border border-gray-400 p-2 text-right">{transportMoveType === 'over_30km' ? '별도협의' : formatCurrency(PRICING.transportMove[transportMoveType]) + '원'}</td>
                            </tr>
                        )}
                          {transportType !== 'none' && (
                              <tr>
                                <td className="border border-gray-400 p-2">층간 운반비</td>
                                <td className="border border-gray-400 p-2 text-right">1식</td>
                                <td className="border border-gray-400 p-2 text-right">{formatCurrency(PRICING.transport[transportType])}원</td>
                            </tr>
                        )}
                        {/* 기타 */}
                        {airGuideCount > 0 && (
                              <tr>
                                <td className="border border-gray-400 p-2">에어 가이드</td>
                                <td className="border border-gray-400 p-2 text-right">{airGuideCount}개</td>
                                <td className="border border-gray-400 p-2 text-right">{formatCurrency(airGuideCount * 50000)}원</td>
                            </tr>
                        )}
                        {isPrePiping && (
                              <tr>
                                <td className="border border-gray-400 p-2">선배관 작업</td>
                                <td className="border border-gray-400 p-2 text-right">1식</td>
                                <td className="border border-gray-400 p-2 text-right">100,000원</td>
                            </tr>
                        )}
                        {isCeilingWork && (
                              <tr>
                                <td className="border border-gray-400 p-2">천장 작업</td>
                                <td className="border border-gray-400 p-2 text-right">1식</td>
                                <td className="border border-gray-400 p-2 text-right">100,000원</td>
                            </tr>
                        )}
                        {(floorSleeveCount > 0 || inspectionHoleCount > 0) && (
                              <tr>
                                <td className="border border-gray-400 p-2">슬리브/점검구</td>
                                <td className="border border-gray-400 p-2 text-right">{floorSleeveCount + inspectionHoleCount}개</td>
                                <td className="border border-gray-400 p-2 text-right">{formatCurrency((floorSleeveCount * 50000) + (inspectionHoleCount * 100000))}원</td>
                            </tr>
                        )}
                        <tr className="bg-gray-200 font-bold">
                            <td className="border border-gray-400 p-2 text-center" colSpan="2">총 합계</td>
                            <td className="border border-gray-400 p-2 text-right text-lg">{formatCurrency(totalPrice)}원</td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="mt-8 text-xs text-gray-500 text-left space-y-1 border-t border-gray-300 pt-4">
                    <p className="font-bold mb-2">[ 유의 사항 ]</p>
                    <p>1. 본 견적서는 예상 금액이며 현장 상황에 따라 실제 비용과 차이가 있을 수 있습니다.</p>
                    <p>2. 주차비, 장비 사용료(사다리차/스카이 등)는 별도입니다.</p>
                    <p>3. 견적 유효 기간: 발행일로부터 10일</p>
                    <p>4. 특수 작업(난타공, 특수배관 등) 발생 시 추가 비용이 청구될 수 있습니다.</p>
                </div>
            </div>

            {/* 모달 푸터 */}
            <div className="p-4 border-t bg-gray-50 flex flex-col gap-2 shrink-0">
              <p className="text-xs text-red-500 text-center font-bold mb-1">
                ※ 인쇄 버튼을 눌러 PDF로 저장하거나 화면을 캡처해서 사용하세요.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowReceiptModal(false)}
                  className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  닫기
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer size={18} />
                  인쇄 / PDF 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 실제 인쇄 시에만 보이는 숨겨진 영역 (브라우저 인쇄 기능용) - PC용 바로 인쇄 */}
      <div className="hidden print:block print:p-8 bg-white absolute top-0 left-0 w-full h-full z-[9999]">
          <div className="text-center mb-6 border-b-2 border-black pb-4">
              <h2 className="text-3xl font-bold mb-4 text-black">에어컨 설치 예상 견적서</h2>
              <div className="text-base text-gray-700 space-y-1">
                  <h3 className="text-xl font-bold mb-1">주식회사 다담아</h3>
                  <p>담당자: 010-7979-0499</p>
                  <p>이메일: dadama2017@naver.com</p>
              </div>
          </div>
          
           <table className="w-full text-sm border-collapse border border-gray-400 mb-8 text-black">
              <thead>
                  <tr className="bg-gray-100">
                      <th className="border border-gray-400 p-2 text-left">항목</th>
                      <th className="border border-gray-400 p-2 text-right">내용/수량</th>
                      <th className="border border-gray-400 p-2 text-right">금액</th>
                  </tr>
              </thead>
              <tbody>
                  <tr><td className="border border-gray-400 p-2">기본 설치비</td><td className="border border-gray-400 p-2 text-right">{acCount}대</td><td className="border border-gray-400 p-2 text-right">{formatCurrency(breakdown.base)}원</td></tr>
                  {/* 상세 항목들 (위와 동일한 로직 복사) */}
                   {pipeLength > 0 && (
                      <tr>
                          <td className="border border-gray-400 p-2">추가 배관</td>
                          <td className="border border-gray-400 p-2 text-right">{pipeLength}m</td>
                          <td className="border border-gray-400 p-2 text-right">{formatCurrency(pipeLength * (acType === '2in1' ? (PRICING.pipePerMeter[acMode]['2in1_stand'] || PRICING.pipePerMeter[acMode]['stand']) : (AC_TYPES[acMode].find(i => i.id === acType)?.pipePrice || 0)))}원</td>
                      </tr>
                  )}
                   {pipeLengthWall > 0 && (
                      <tr>
                          <td className="border border-gray-400 p-2">추가 배관 (벽걸이)</td>
                          <td className="border border-gray-400 p-2 text-right">{pipeLengthWall}m</td>
                          <td className="border border-gray-400 p-2 text-right">
                              {formatCurrency(pipeLengthWall * (PRICING.pipePerMeter[acMode]['2in1_wall'] || PRICING.pipePerMeter[acMode]['wall']))}원
                          </td>
                      </tr>
                  )}
                   {specialPipeLength > 0 && (
                      <tr>
                          <td className="border border-gray-400 p-2">특수 배관 (주름관)</td>
                          <td className="border border-gray-400 p-2 text-right">{specialPipeLength}m</td>
                          <td className="border border-gray-400 p-2 text-right">{formatCurrency(specialPipeLength * 30000)}원</td>
                      </tr>
                  )}
                  {buriedCount > 0 && installType === 'buried' && (
                      <tr>
                          <td className="border border-gray-400 p-2">매립 배관 (용접/세척)</td>
                          <td className="border border-gray-400 p-2 text-right">{buriedCount}식</td>
                          <td className="border border-gray-400 p-2 text-right">{formatCurrency(buriedCount * 100000)}원</td>
                      </tr>
                  )}
                   {smartLinkCount > 0 && (
                      <tr>
                          <td className="border border-gray-400 p-2">스마트링크 (삼성)</td>
                          <td className="border border-gray-400 p-2 text-right">{smartLinkCount}개</td>
                          <td className="border border-gray-400 p-2 text-right">{formatCurrency(smartLinkCount * 30000)}원</td>
                      </tr>
                  )}
                   {Object.keys(gasCounts).map(key => gasCounts[key] > 0 && (
                      <tr key={key}>
                              <td className="border border-gray-400 p-2">냉매 추가 ({key.includes('under5') ? '5m이하' : key.includes('over10') ? '10m초과' : '5m초과'})</td>
                              <td className="border border-gray-400 p-2 text-right">{gasCounts[key]}회</td>
                              <td className="border border-gray-400 p-2 text-right">{key === 'over10' ? '별도협의' : formatCurrency(gasCounts[key] * PRICING.gasOptions[key]) + '원'}</td>
                      </tr>
                  ))}
                    {Object.keys(rackCounts).map(key => rackCounts[key] > 0 && (
                      <tr key={key}>
                              <td className="border border-gray-400 p-2">
                              {key.includes('new') ? '신규 앵글' : key.includes('exist') ? '보유 앵글' : key.includes('danger') ? '위험 수당' : '바닥 베이스'}
                              {key.includes('custom') && ' (주문제작)'}
                              </td>
                              <td className="border border-gray-400 p-2 text-right">{rackCounts[key]}개</td>
                              <td className="border border-gray-400 p-2 text-right">{key === 'new_custom' ? '별도협의' : formatCurrency(rackCounts[key] * PRICING.rack[key]) + '원'}</td>
                      </tr>
                  ))}
                  {(holeCountGeneral > 0 || holeCountDifficult > 0 || holeCountSpecial > 0) && (
                          <tr>
                          <td className="border border-gray-400 p-2">타공 (일반/난타공/특수)</td>
                          <td className="border border-gray-400 p-2 text-right">{holeCountGeneral + holeCountDifficult + holeCountSpecial}구</td>
                          <td className="border border-gray-400 p-2 text-right">
                              {formatCurrency(
                                  (holeCountGeneral * 30000) + (holeCountDifficult * 50000) + (holeCountSpecial * 70000)
                              )}원
                          </td>
                          </tr>
                  )}
                   {powerCableLength > 0 && (
                      <tr>
                          <td className="border border-gray-400 p-2">전원선 ({powerCableType === 'under40' ? '40평↓' : '40평↑'})</td>
                          <td className="border border-gray-400 p-2 text-right">{powerCableLength}m</td>
                          <td className="border border-gray-400 p-2 text-right">{formatCurrency(powerCableLength * (powerCableType === 'under40' ? 10000 : 15000))}원</td>
                      </tr>
                  )}
                  {Object.keys(breakerCounts).map(key => breakerCounts[key] > 0 && (
                          <tr key={key}>
                              <td className="border border-gray-400 p-2">차단기 작업</td>
                              <td className="border border-gray-400 p-2 text-right">{breakerCounts[key]}개</td>
                              <td className="border border-gray-400 p-2 text-right">{formatCurrency(breakerCounts[key] * PRICING.electric.breaker[key])}원</td>
                          </tr>
                  ))}
                   {Object.keys(drainPumpCounts).map(key => drainPumpCounts[key] > 0 && (
                          <tr key={key}>
                              <td className="border border-gray-400 p-2">배수 펌프</td>
                              <td className="border border-gray-400 p-2 text-right">{drainPumpCounts[key]}개</td>
                              <td className="border border-gray-400 p-2 text-right">{formatCurrency(drainPumpCounts[key] * PRICING.drain.pump[key])}원</td>
                          </tr>
                  ))}
                  {(drainHoseLength > 0 || drainPVCLength > 0) && (
                      <tr>
                              <td className="border border-gray-400 p-2">추가 드레인 (호스/PVC)</td>
                              <td className="border border-gray-400 p-2 text-right">{drainHoseLength + drainPVCLength}m</td>
                              <td className="border border-gray-400 p-2 text-right">{formatCurrency((drainHoseLength * 4000) + (drainPVCLength * 10000))}원</td>
                      </tr>
                  )}
                  {removalType !== 'none' && removalType !== 'basic' && (
                      <tr>
                          <td className="border border-gray-400 p-2">철거비</td>
                          <td className="border border-gray-400 p-2 text-right">1식</td>
                          <td className="border border-gray-400 p-2 text-right">{formatCurrency(PRICING.removal[removalType])}원</td>
                      </tr>
                  )}
                  {transportMoveType !== 'none' && (
                          <tr>
                          <td className="border border-gray-400 p-2">권역 이동 운반비</td>
                          <td className="border border-gray-400 p-2 text-right">1식</td>
                          <td className="border border-gray-400 p-2 text-right">{transportMoveType === 'over_30km' ? '별도협의' : formatCurrency(PRICING.transportMove[transportMoveType]) + '원'}</td>
                      </tr>
                  )}
                      {transportType !== 'none' && (
                          <tr>
                          <td className="border border-gray-400 p-2">층간 운반비</td>
                          <td className="border border-gray-400 p-2 text-right">1식</td>
                          <td className="border border-gray-400 p-2 text-right">{formatCurrency(PRICING.transport[transportType])}원</td>
                          </tr>
                      )}
                   {airGuideCount > 0 && (
                          <tr>
                          <td className="border border-gray-400 p-2">에어 가이드</td>
                          <td className="border border-gray-400 p-2 text-right">{airGuideCount}개</td>
                          <td className="border border-gray-400 p-2 text-right">{formatCurrency(airGuideCount * 50000)}원</td>
                      </tr>
                  )}
                  {isPrePiping && (
                          <tr>
                          <td className="border border-gray-400 p-2">선배관 작업</td>
                          <td className="border border-gray-400 p-2 text-right">1식</td>
                          <td className="border border-gray-400 p-2 text-right">100,000원</td>
                      </tr>
                  )}
                  {isCeilingWork && (
                          <tr>
                          <td className="border border-gray-400 p-2">천장 작업</td>
                          <td className="border border-gray-400 p-2 text-right">1식</td>
                          <td className="border border-gray-400 p-2 text-right">100,000원</td>
                          </tr>
                      )}
                      {(floorSleeveCount > 0 || inspectionHoleCount > 0) && (
                            <tr>
                              <td className="border border-gray-400 p-2">슬리브/점검구</td>
                              <td className="border border-gray-400 p-2 text-right">{floorSleeveCount + inspectionHoleCount}개</td>
                              <td className="border border-gray-400 p-2 text-right">{formatCurrency((floorSleeveCount * 50000) + (inspectionHoleCount * 100000))}원</td>
                          </tr>
                      )}
                  <tr className="bg-gray-200 font-bold">
                      <td className="border border-gray-400 p-2 text-center" colSpan="2">총 합계</td>
                      <td className="border border-gray-400 p-2 text-right text-lg">{formatCurrency(totalPrice)}원</td>
                  </tr>
              </tbody>
          </table>
           <div className="mt-8 text-xs text-gray-500 text-left space-y-1 border-t border-gray-300 pt-4">
                <p className="font-bold mb-2">[ 유의 사항 ]</p>
                <p>1. 본 견적서는 예상 금액이며 현장 상황에 따라 실제 비용과 차이가 있을 수 있습니다.</p>
                <p>2. 주차비, 장비 사용료(사다리차/스카이 등)는 별도입니다.</p>
                <p>3. 견적 유효 기간: 발행일로부터 10일</p>
          </div>
      </div>

    </div>
  );
}