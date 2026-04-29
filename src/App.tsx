/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, XCircle, RefreshCw, Languages, Download, Award } from 'lucide-react';

const PrimaryButton = ({ children, className = '', ...props }: any) => (
  <button
    {...props}
    className={`px-10 py-4 rounded-full font-extrabold uppercase tracking-widest text-xs transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
  >
    {children}
  </button>
);

const levels = [
  {
    id: 1,
    type: 'single-choice',
    title: { en: 'Mission 01: The Robot Apology', th: 'ภารกิจที่ 01: หุ่นยนต์ไร้หัวใจ' },
    story: { en: "You asked AI to 'Write an apology email to a VIP client'. The result sounded like a heartless robot.", th: "คุณสั่ง AI แบบผ่านๆ ให้ 'เขียนอีเมลขอโทษลูกค้า VIP' แต่จดหมายที่ได้กลับแข็งทื่อราวกับหุ่นยนต์ตอบรับอัตโนมัติ" },
    question: { en: 'Which upgraded prompt will save the client relationship?', th: 'Prompt แบบไหนที่จะไปกู้ศรัทธาจากลูกค้ากลับมาได้?' },
    choices: [
      { en: 'Write an apology email and say sorry 5 times.', th: 'เขียนอีเมลขอโทษ และพิมพ์คำว่า "ขอโทษ" ย้ำๆ 5 ครั้ง' },
      { en: 'Act as a Senior Customer Success Manager. Write a sincere, empathetic apology email to a VIP client experiencing a delayed shipment. Outline our immediate solutions.', th: 'สวมบทบาทเป็น Senior Customer Success Manager เขียนอีเมลขอโทษที่จริงใจและเห็นอกเห็นใจให้ลูกค้า VIP ที่ได้ของช้า พร้อมระบุแนวทางแก้ไขปัญหาทันที' }
    ],
    answer: 1,
    learning: { en: "Role Prompting: Giving the AI a persona ('Act as a...') drastically changes the tone and professional quality of the output.", th: "Persona (กำหนดบทบาท): การสั่งให้ AI สวมบท ('สวมบทเป็น...') จะเปลี่ยนโทนและระดับภาษาให้เป็นมืออาชีพขึ้นทันตาเห็น" },
    hint: { en: "“Empathy isn't my default setting. You have to tell me who to be!”", th: "“ฉันไม่มีความรู้สึกเป็นค่าเริ่มต้นหรอกนะ คุณต้องกำหนดบทบาทให้ฉันสวมวิญญาณสิ!”" }
  },
  {
    id: 2,
    type: 'multi-select',
    title: { en: 'Mission 02: The Fake Policy', th: 'ภารกิจที่ 02: นโยบายทิพย์' },
    story: { en: "The AI summarized the HR handbook but hallucinated a fake 'Unlimited Free Pizza Friday' policy. The whole office is now demanding pizza.", th: "AI สรุปคู่มือพนักงาน แต่กลับ 'มโน' ข้อมูลนโยบาย 'กินพิซซ่าฟรีทุกวันศุกร์' ขึ้นมาเอง ตอนนี้พนักงานประท้วงเรียกร้องพิซซ่ากันทั้งออฟฟิศ!" },
    question: { en: 'How do you ground the AI to stop it from making things up? (Select all that apply)', th: 'จะตีกรอบ AI อย่างไร ให้เลิกมโนเนื้อหาขึ้นมาเอง? (เลือกทุกข้อที่ถูกต้อง)' },
    options: [
      { en: "Add: 'Only use the provided company handbook text.'", th: "ใส่เงื่อนไข: 'อ้างอิงข้อมูลจากคู่มือพนักงานที่แนบมานี้เท่านั้น'" },
      { en: "Add: 'If the answer is not in the text, say \"Information not found\".'", th: "ใส่เงื่อนไข: 'หากไม่พบคำตอบในเอกสาร ให้แจ้งว่า \"ไม่พบข้อมูล\"'" },
      { en: "Add: 'Make the summary sound fun and creative.'", th: "ใส่เงื่อนไข: 'สรุปให้อ่านสนุกสนานและใช้ความคิดสร้างสรรค์เต็มที่'" },
      { en: "Paste the actual handbook text into the prompt.", th: "ก๊อปปี้เนื้อหาคู่มือพนักงานจริงๆ แปะลงไปให้ AI อ่านด้วย" }
    ],
    answer: [0, 1, 3],
    learning: { en: 'Grounding: To prevent hallucinations, provide the source material and explicitly instruct the AI to stick to it and admit when it doesn\'t know.', th: 'Grounding (ตีกรอบข้อมูลอ้างอิง): กฎเหล็กกัน AI มั่ว คือต้อง \"ให้ข้อมูลจริง\" และสั่งเด็ดขาดว่าห้ามตอบนอกเหนือจากนี้ ถ้าไม่รู้ต้องกล้าบอกว่าไม่รู้' },
    hint: { en: "“If you don't give me the facts, I might just invent them. Pizza, anyone?”", th: "“ถ้าไม่หล่อเลี้ยงฉันด้วยข้อมูลจริง ฉันก็อาจจะมโนเรื่องขึ้นมาเองนะ ใครอยากกินพิซซ่าทิพย์บ้าง?”" }
  },
  {
    id: 3,
    type: 'single-choice',
    title: { en: 'Mission 03: The Jumbled Strategy', th: 'ภารกิจที่ 03: กลยุทธ์พังพินาศ' },
    story: { en: "You prompted 'Analyze Q3 data and give a marketing strategy.' The AI spat out a confusing conclusion with zero logical reasoning.", th: "คุณสั่งว่า 'วิเคราะห์ข้อมูลไตรมาส 3 แล้ววางแผนการตลาดที' สิ่งที่ AI ส่วนกลับมาคือแผนลอยๆ ที่จับต้นชนปลายไม่ถูกและไม่มีเหตุผลซัพพอร์ต" },
    question: { en: 'How do you guide the AI to think more logically?', th: 'คุณจะประคองให้ AI คิดอย่างเป็นเหตุเป็นผลมากขึ้นได้อย่างไร?' },
    choices: [
      { en: "Make the strategy sound more professional and use bigger words.", th: "สั่งให้ใช้คำหรูๆ และดูเป็นทางการมากขึ้น" },
      { en: "Analyze Q3 data and give a marketing strategy. Think step-by-step: 1) Identify top-selling products, 2) Find underperforming regions, 3) Suggest targeted campaigns.", th: "วิเคราะห์ข้อมูล Q3 และวางกลยุทธ์การตลาด โดยคิดเป็นขั้นตอน: 1) หาสินค้าขายดี 2) หาพื้นที่ที่อ่อนแอ 3) เสนอแคมเปญเจาะจงเป้าหมาย" }
    ],
    answer: 1,
    learning: { en: "Chain of Thought: Asking the AI to 'Think step-by-step' or breaking down the task forces it to reason logically before concluding.", th: "Chain of Thought (คิดอย่างเป็นระบบ): หั่นงานออกเป็นข้อๆ หรือสั่งให้ 'คิดเป็นขั้นตอน' จะบังคับให้ AI สร้างตรรกะก่อนที่จะโพล่งผลสรุปออกมา" },
    hint: { en: "“My brain works fast, but sometimes it needs a roadmap to make sense.”", th: "“สมองฉันประมวลผลเร็วก็จริง แต่บางทีก็ต้องการแผนที่ช่วยนำทางในการคิดเป็นขั้นตอนนะ!”" }
  },
  {
    id: 4,
    type: 'multi-select',
    title: { en: 'Mission 04: The Wall of Text', th: 'ภารกิจที่ 04: กำแพงมหาประลัย' },
    story: { en: "The AI summarized a 50-page competitor analysis into one massive paragraph. Your boss has exactly 30 seconds to read it.", th: "AI ย่นย่อบทวิเคราะห์คู่แข่ง 50 หน้าออกมาเป็นย่อหน้าเดียวที่ยาวเป็นกำแพงเมืองจีน เจ้านายคุณมีเวลาอ่านแค่ 30 วินาทีเท่านั้น" },
    question: { en: 'What output instructions should you add? (Select all that apply)', th: 'ควรเพิ่มคำสั่งในการจัดโครงสร้างแบบไหน? (เลือกข้อที่ช่วยได้)' },
    options: [
      { en: "Format the output as a Markdown table comparing our strengths and weaknesses.", th: "จัดรูปแบบเป็นตาราง Markdown เปรียบเทียบจุดแข็งและจุดอ่อน" },
      { en: "Use exactly 10,000 words.", th: "เขียนให้ได้ 10,000 คำเป๊ะๆ ห้ามขาดห้ามเกิน" },
      { en: "Provide a 3-bullet point executive summary at the very top.", th: "สรุปใจความสำคัญ (Executive Summary) 3 ข้อสั้นๆ ไว้บรรทัดแรกสุด" },
      { en: "Include relevant emojis replacing all nouns to save space.", th: "ใส่อีโมจิแทนคำนามทั้งหมด เพื่อประหยัดพื้นที่หน้ากระดาษ" }
    ],
    answer: [0, 2],
    learning: { en: 'Output Formatting: Always dictate the structure. AI is excellent at generating tables, JSON, bullet points, or executive summaries if asked.', th: 'Formatting (การกำหนดรูปแบบ): กุมบังเหียนรูปแบบผลลัพธ์เสนอ AI เก่งมากเรื่องการทำตาราง การจัดหัวบุลเล็ต หรือแม้แต่ JSON ขอแค่สั่งมันให้ชัดเจน' },
    hint: { en: "“I can write forever. You need to give me specific boundaries!”", th: "“ฉันเขียนยาวเป็นกิโลได้นะ ถ้าคุณไม่ตีกรอบหน้าตาของคำตอบให้ชัดเจน!”" }
  },
  {
    id: 5,
    type: 'single-choice',
    title: { en: 'Mission 05: The Category Chaos', th: 'ภารกิจที่ 05: จัดหมวดหมู่สุดมึน' },
    story: { en: "You want AI to categorize user feedback into [Bug], [Feature Request], or [Praise]. Instead, it invents random categories like [Oopsie] and [Cool Idea].", th: "คุณสั่งให้ AI จัดหมวดหมู่ Feedback ผู้ใช้เป็น [Bug], [Feature Request] หรือ [Praise] แต่มันดื้อ แอบสร้างหมวด [Oopsie] กับ [Cool Idea] ขึ้นมาเองเฉยเลย" },
    question: { en: 'What is the most reliable Prompt Engineering technique to fix this?', th: 'เทคนิค Prompt Engineering ขั้นเทพใดที่แก้รำคาญเรื่องนี้ได้เด็ดขาดที่สุด?' },
    choices: [
      { en: "Provide 3 examples showing exactly how to categorize feedback before asking it to do the real task.", th: "ยกตัวอย่าง Input->Output ให้ดู 3 ตัวอย่างชัดๆ ว่าต้องจัดหมวดหมู่อย่างไร ก่อนจะสั่งให้มันประมวลผลจริง" },
      { en: "Write 'DO NOT INVENT CATEGORIES' in all caps at the end.", th: "ตะโกนบอกมันว่า 'ห้ามสร้างหมวดหมู่ใหม่เด็ดขาด!!!' ไว้ท้ายข้อความ" }
    ],
    answer: 0,
    learning: { en: 'Few-Shot Prompting: Showing the AI a few examples (Input -> Output) is the strongest way to enforce strict formatting and category rules.', th: 'Few-Shot Prompting (การยกตัวอย่าง): การยัดตัวอย่าง (Input -> Output) ให้ AI ดูเป็นน้ำจิ้ม คือวิธีที่ทรงพลังที่สุดในการตีกรอบพฤติกรรมของ AI ให้อยู่หมัด' },
    hint: { en: "“Don't just tell me what to do—show me! I love a good example.”", th: "“อย่าเอาแต่ออกคำสั่งสิ ทำให้ฉันดูหน่อยน่า ฉันชอบเรียนรู้จากตัวอย่างนะ!”" }
  }
];

export default function App() {
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'feedback' | 'end'>('start');
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);
  const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [certificateDataUrl, setCertificateUrl] = useState<string | null>(null);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'th' : 'en');
  
  const currentLevel = levels[currentLevelIndex];

  const handleStart = () => {
    setCurrentLevelIndex(0);
    setScore(0);
    setGameState('playing');
    setSelectedMulti([]);
    setSelectedSingle(null);
    setUserName('');
    setCertificateUrl(null);
  };

  const generateCertificate = () => {
    if (!userName.trim()) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cute minimal border
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(40, 40, canvas.width - 80, canvas.height - 80, 40);
    } else {
      ctx.rect(40, 40, canvas.width - 80, canvas.height - 80);
    }
    ctx.stroke();

    // Cute corner blobs
    ctx.fillStyle = '#ECFDF5'; // very light emerald
    ctx.beginPath();
    ctx.arc(40, 40, 160, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFBEB'; // very light amber
    ctx.beginPath();
    ctx.arc(canvas.width - 40, canvas.height - 40, 180, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#EFF6FF'; // very light blue
    ctx.beginPath();
    ctx.arc(canvas.width - 40, 40, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FDF2F8'; // very light pink
    ctx.beginPath();
    ctx.arc(40, canvas.height - 40, 140, 0, Math.PI * 2);
    ctx.fill();

    // Issued by
    ctx.textAlign = 'center';
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillText('ISSUED BY CU: PA-LEARN', canvas.width / 2, 160);

    // Header Text
    ctx.fillStyle = '#111827';
    ctx.font = '900 64px "Inter", sans-serif';
    ctx.fillText('CERTIFICATE OF MASTERY', canvas.width / 2, 230);

    ctx.fillStyle = '#6B7280';
    ctx.font = '30px "IBM Plex Sans Thai", "Inter", sans-serif';
    ctx.fillText('ขอมอบประกาศนียบัตรฉบับนี้เพื่อแสดงว่า', canvas.width / 2, 310);

    // Name background (cute pill shape)
    const nameText = userName.trim();
    ctx.font = 'bold 72px "Inter", "IBM Plex Sans Thai", sans-serif';
    const textWidth = ctx.measureText(nameText).width;
    const boxWidth = Math.max(textWidth + 160, 400);
    
    ctx.fillStyle = '#ECFDF5';
    ctx.beginPath();
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(canvas.width/2 - boxWidth/2, 370, boxWidth, 120, 60);
    } else {
      ctx.fillRect(canvas.width/2 - boxWidth/2, 370, boxWidth, 120);
    }
    ctx.fill();

    // Name
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 72px "Inter", "IBM Plex Sans Thai", sans-serif';
    ctx.fillText(nameText, canvas.width / 2, 455);

    // Body Text
    ctx.fillStyle = '#6B7280';
    ctx.font = '28px "IBM Plex Sans Thai", "Inter", sans-serif';
    ctx.fillText('ได้ผ่านการทดสอบทักษะและได้รับการรับรองในฐานะ', canvas.width / 2, 570);

    // Title
    ctx.fillStyle = '#10B981';
    ctx.font = '900 60px "Inter", sans-serif';
    ctx.fillText('PROMPT MASTER', canvas.width / 2, 650);
    
    // Bottom Details
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 24px "Inter", sans-serif';
    // Date
    const certDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    ctx.fillText(certDate, 300, 720);
    
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText('DATE OF ISSUE', 300, 745);
    
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.fillText('CU: PA-LEARN', 900, 720);
    
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText('AUTHORIZED ISSUER', 900, 745);

    setCertificateUrl(canvas.toDataURL('image/png'));
  };

  const handleToggleMulti = (index: number) => {
    setSelectedMulti(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleSubmit = () => {
    let correct = false;
    if (currentLevel.type === 'multi-select') {
      const correctAnswers = currentLevel.answer as number[];
      if (
        selectedMulti.length === correctAnswers.length &&
        selectedMulti.every(val => correctAnswers.includes(val))
      ) {
        correct = true;
      }
    } else {
      correct = selectedSingle === currentLevel.answer;
    }

    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
    setGameState('feedback');
  };

  const handleNext = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
      setGameState('playing');
      setSelectedMulti([]);
      setSelectedSingle(null);
    } else {
      setGameState('end');
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink font-sans selection:bg-accent selection:text-black flex flex-col">
      <header className="h-20 flex items-center justify-between px-6 sm:px-12 w-full max-w-6xl mx-auto z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent text-white">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-ink">Prompt Hero</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden sm:flex font-bold text-sm text-muted">
              <span>{lang === 'en' ? 'Score' : 'คะแนน'}: {score} XP</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted">
              <button 
                onClick={() => setLang('en')} 
                className={`transition-colors ${lang === 'en' ? 'text-ink' : 'hover:text-ink'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('th')} 
                className={`transition-colors ${lang === 'th' ? 'text-ink' : 'hover:text-ink'}`}
              >
                TH
              </button>
            </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full relative">
          <AnimatePresence mode="wait">
            {gameState === 'start' && (
              <motion.div 
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center p-10 sm:p-16 hero-gradient rounded-3xl overflow-hidden relative border border-surface-hover"
              >
                <div className="character-blob mx-auto flex items-center justify-center mb-10 w-24 h-24">
                  <div className="flex gap-2">
                     <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                     <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter mb-6 text-ink pb-2">
                  Prompt Hero
                </h1>
                <p className="text-xl text-muted mb-12 font-medium">
                  {lang === 'en' 
                    ? 'The AI engine is running cold. Your prompts are the fuel. We need heat.' 
                    : 'เครื่องยนต์ AI กำลังรอการขับเคลื่อน... Prompt ของคุณคือเชื้อเพลิง มาจุดเครื่องให้ร้อนแรงกัน!'}
                </p>
                <PrimaryButton 
                  onClick={handleStart}
                  className="bg-accent text-white hover:bg-accent-hover w-full sm:inline-flex sm:w-auto shadow-lg shadow-accent/20"
                >
                  {lang === 'en' ? 'Start Mission' : 'เริ่มภารกิจ'}
                </PrimaryButton>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div 
                key="playing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full relative py-8"
              >
                <div className="massive-num">0{currentLevel.id}</div>
                
                <div className="relative z-10 flex flex-col bg-white border border-surface-hover rounded-3xl p-8 sm:p-12 mb-8 shadow-xl shadow-ink/5">
                  <div className="mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-ink">
                      {currentLevel.title[lang]}
                    </h2>
                    <p className="text-lg text-muted font-medium">
                      {currentLevel.story[lang]}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start mb-12 pt-8 border-t border-surface-hover">
                    <div className="md:col-span-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                        {lang === 'en' ? 'The Challenge' : 'ความท้าทาย'}
                      </p>
                      <h3 className="text-xl font-bold mb-6 text-ink leading-relaxed">
                        {currentLevel.question[lang]}
                      </h3>
                      <div className="space-y-3">
                        {currentLevel.type === 'multi-select' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentLevel.options && currentLevel.options.map((opt, i) => {
                              const isSelected = selectedMulti.includes(i);
                              return (
                                <button
                                  key={i}
                                  onClick={() => handleToggleMulti(i)}
                                  className={`option-chip text-sm px-6 py-5 text-left font-medium rounded-xl text-muted ${
                                    isSelected ? 'selected' : ''
                                  }`}
                                >
                                  {opt[lang]}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-4">
                            {currentLevel.choices && currentLevel.choices.map((choice, i) => {
                              const isSelected = selectedSingle === i;
                              return (
                                <button
                                  key={i}
                                  onClick={() => setSelectedSingle(i)}
                                  className={`option-chip text-sm px-6 py-5 text-left font-medium rounded-xl text-muted ${
                                    isSelected ? 'selected' : ''
                                  }`}
                                >
                                  {choice[lang]}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex flex-col items-center justify-center p-8 bg-surface rounded-2xl border border-surface-hover">
                      <div className="character-blob mb-6 w-16 h-16 flex items-center justify-center">
                        <div className="flex gap-1">
                           <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                           <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-muted">
                          Prompty says
                        </p>
                        <p className="text-base text-ink font-medium leading-relaxed">
                          "{currentLevel.hint[lang]}"
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <footer className="mt-8 flex justify-between items-center sm:flex-row flex-col gap-6">
                    <div className="flex gap-2 w-full sm:w-auto flex-1 max-w-xs">
                      {levels.map((lvl, i) => (
                        <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= currentLevelIndex ? 'bg-ink' : 'bg-surface-hover'}`}></div>
                      ))}
                    </div>
                    <PrimaryButton 
                      onClick={handleSubmit}
                      disabled={(currentLevel.type === 'multi-select' && selectedMulti.length === 0) || (currentLevel.type === 'single-choice' && selectedSingle === null)}
                      className="bg-ink text-white hover:bg-gray-800 disabled:opacity-20 disabled:scale-100 hidden sm:flex shadow-lg shadow-ink/10"
                    >
                      {lang === 'en' ? 'Verify Answer' : 'ส่งคำตอบ'}
                    </PrimaryButton>
                    <PrimaryButton 
                      onClick={handleSubmit}
                      disabled={(currentLevel.type === 'multi-select' && selectedMulti.length === 0) || (currentLevel.type === 'single-choice' && selectedSingle === null)}
                      className="bg-ink text-white hover:bg-gray-800 disabled:opacity-20 disabled:scale-100 w-full sm:hidden shadow-lg shadow-ink/10"
                    >
                      {lang === 'en' ? 'Verify Answer' : 'ส่งคำตอบ'}
                    </PrimaryButton>
                  </footer>
                </div>
              </motion.div>
            )}

            {gameState === 'feedback' && (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full relative py-8"
              >
                <div className="massive-num">0{currentLevel.id}</div>
                <div className="bg-white border border-surface-hover rounded-3xl p-8 sm:p-16 relative z-10 flex flex-col justify-center shadow-xl shadow-ink/5">
                  <div className="mb-12 text-center">
                    <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-xl ${
                      isCorrect ? 'bg-accent text-white shadow-accent/40' : 'bg-[#EF4444] text-white shadow-red-500/40'
                    }`}>
                       {isCorrect ? <CheckCircle2 className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-2 text-ink">
                       {isCorrect 
                         ? (lang === 'en' ? 'Answer Correct' : 'ตอบถูกต้อง!') 
                         : (lang === 'en' ? 'Incorrect' : 'พบข้อผิดพลาด')}
                    </h2>
                  </div>

                  <div className="bg-surface rounded-2xl border border-surface-hover p-8 mb-12">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
                      {lang === 'en' ? 'Key Learning' : 'สิ่งที่ได้เรียนรู้'}
                    </p>
                    <p className="text-xl text-ink font-medium leading-relaxed">
                      {currentLevel.learning[lang]}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <PrimaryButton 
                      onClick={handleNext}
                      className="bg-ink text-white shadow-lg shadow-ink/10 hover:bg-gray-800 w-full sm:w-auto justify-center flex items-center"
                    >
                      {currentLevelIndex < levels.length - 1 
                        ? (lang === 'en' ? 'Next Mission' : 'ด่านถัดไป') 
                        : (lang === 'en' ? 'View Intel' : 'ดูผลลัพธ์')}
                    </PrimaryButton>
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'end' && (
              <motion.div 
                key="end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-12 sm:p-20 bg-white border border-surface-hover rounded-3xl shadow-xl shadow-ink/5 hero-gradient"
              >
                {score === levels.length && !certificateDataUrl ? (
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto bg-accent text-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-accent/20">
                      <Award className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-ink">
                      {lang === 'en' ? 'Claim Your Certificate' : 'รับใบประกาศนียบัตร'}
                    </h1>
                    <p className="text-lg text-muted font-medium mb-8">
                      {lang === 'en' 
                        ? 'Flawless execution. Enter your name to generate your Prompt Master certificate.' 
                        : 'ผลงานระดับมาสเตอร์! โปรดกรอกชื่อของคุณเพื่อรับใบประกาศนียบัตร'}
                    </p>
                    <div className="flex flex-col gap-4">
                      <input 
                        type="text" 
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        placeholder={lang === 'en' ? 'Your Full Name' : 'ชื่อ-นามสกุล ของคุณ'}
                        className="w-full px-6 py-4 text-lg border border-surface-hover bg-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-center font-bold"
                      />
                      <PrimaryButton 
                        onClick={generateCertificate}
                        disabled={!userName.trim()}
                        className="bg-ink text-white disabled:opacity-50 disabled:scale-100 shadow-lg shadow-ink/20 justify-center flex items-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        {lang === 'en' ? 'Generate Certificate' : 'สร้างใบประกาศฯ'}
                      </PrimaryButton>
                    </div>
                  </div>
                ) : score === levels.length && certificateDataUrl ? (
                   <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-ink">
                      {lang === 'en' ? 'Congratulations, Master!' : 'ขอแสดงความยินดี!'}
                    </h1>
                    <div className="mb-8 rounded-xl overflow-hidden border-4 border-surface-hover shadow-xl relative">
                       <img src={certificateDataUrl} alt="Certificate" className="w-full h-auto object-contain block" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href={certificateDataUrl} 
                        download={`PromptMaster_Certificate_${userName.replace(/\s+/g, '_')}.png`}
                        className="px-10 py-4 rounded-full font-extrabold uppercase tracking-widest text-xs transition-all duration-200 hover:scale-105 active:scale-95 bg-accent text-white shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                      >
                         <Download className="w-4 h-4" />
                         {lang === 'en' ? 'Download Image' : 'ดาวน์โหลดภาพ'}
                      </a>
                      <PrimaryButton 
                        onClick={handleStart}
                        className="bg-surface-hover text-ink hover:bg-gray-200 border border-surface-hover justify-center flex items-center gap-3"
                      >
                        <RefreshCw className="w-4 h-4" />
                        {lang === 'en' ? 'Play Again' : 'เล่นอีกครั้ง'}
                      </PrimaryButton>
                    </div>
                   </div>
                ) : (
                  <>
                    <div className="w-32 h-32 mx-auto bg-ink text-white rounded-full flex items-center justify-center mb-10 shadow-xl shadow-ink/20">
                      <span className="text-5xl font-black">{score}/{levels.length}</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-ink">
                      {lang === 'en' ? 'Mission Complete' : 'ภารกิจสำเร็จ'}
                    </h1>
                    <p className="text-xl text-muted font-medium mb-12 max-w-lg mx-auto">
                      {lang === 'en' 
                        ? 'Good effort. Review the intel and try again.'
                        : 'ทำได้ดี กลับไปทบทวนแล้วลองอีกครั้งนะ'}
                    </p>
                    <div className="flex justify-center">
                      <PrimaryButton 
                        onClick={handleStart}
                        className="bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-hover w-full sm:w-auto justify-center flex items-center gap-3"
                      >
                        <RefreshCw className="w-4 h-4" />
                        {lang === 'en' ? 'Restart Simulation' : 'เริ่มภารกิจใหม่'}
                      </PrimaryButton>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
