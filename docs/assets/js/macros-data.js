// Auto-generated from macros/warrior-smart/{ru,en}/*.txt — do not edit by hand.
// Embedded so pages need no fetch (GitHub Pages only serves docs/).
window.MACRO_TXT = {
 "ru": {
  "01-attack-rotation": "#showtooltip\n/startattack\n/targetenemy [noharm][dead]\n/cast [nostance:3] Стойка берсерка\n/cast [combat] Боевой крик\n/cast Кровожадность\n/cast Вихрь\n/cast Казнь\n/cast Победный раж\n/cast [m[m[mod:shift] !Удар героя\n/cast [m[m[mod:ctrl] Кровавая ярость\n",
  "02-aoe-pack": "#showtooltip Вихрь\n/startattack\n/targetenemy [noharm][dead]\n/cast [nostance:3] Стойка берсерка\n/cast [combat] Боевой крик\n/cast Вихрь\n/cast !Рассекающий удар\n/cast [m[m[mod:shift] Деморализующий крик\n",
  "03-interrupt": "#showtooltip Зуботычина\n/stopattack\n/cast [nostance:3] Стойка берсерка\n/cast [@mouseover,harm,nodead][] Зуботычина\n/startattack\n",
  "04-charge-intercept": "#showtooltip\n/cast [nocombat,nostance:1] Боевая стойка\n/cast [nocombat] Рывок\n/cast [combat,nostance:3] Стойка берсерка\n/cast [combat] Перехват\n/startattack\n",
  "05-rage-burst": "#showtooltip\n/cast Кровавая ярость\n/cast Ярость берсерка\n/cast [m[m[mod:shift] Безрассудство\n/use [m[m[mod:shift] 13\n",
  "export-part1": "# Экспорт персонажа без аддона — Часть 1/2 (персонаж + таланты).\n# Скопируй строку ниже (без решётки) в макрос в игре и нажми.\n# В чат выйдет строка WEXP1|... — скопируй её в поле на странице «Герой» сайта.\n\n/run n=UnitName\"player\"_,c=UnitClass\"player\"l=UnitLevel\"player\"b,p,m=UnitAttackPower\"player\"hp=UnitHealthMax\"player\"t={}for i=1,3 do _,_,q=GetTalentTabInfo(i)t[i]=q end print(\"WEXP1|\"..n..\"|\"..c..\"|\"..l..\"|\"..b+p+m..\"|\"..hp..\"|\"..table.concat(t,\"/\"))\n",
  "export-part2": "# Экспорт персонажа без аддона — Часть 2/2 (раса + экипировка).\n# Скопируй строку ниже (без решётки) в макрос в игре и нажми.\n# В чат выйдут строки WEXP0|... и WEXP2|... — скопируй их ВСЕ в то же поле на сайте.\n\n/run _,_,r=UnitRace\"player\"print(\"WEXP0|\"..r)for i=1,19 do l=GetInventoryItemLink(\"player\",i)if l then print(\"WEXP2|\"..i..\"|\"..l)end end\n"
 },
 "en": {
  "01-attack-rotation": "#showtooltip\n/startattack\n/targetenemy [noharm][dead]\n/cast [nostance:3] Berserker Stance\n/cast [combat] Battle Shout\n/cast Bloodthirst\n/cast Whirlwind\n/cast Execute\n/cast Victory Rush\n/cast [m[m[mod:shift] !Heroic Strike\n/cast [m[m[mod:ctrl] Bloodrage\n",
  "02-aoe-pack": "#showtooltip Whirlwind\n/startattack\n/targetenemy [noharm][dead]\n/cast [nostance:3] Berserker Stance\n/cast [combat] Battle Shout\n/cast Whirlwind\n/cast !Cleave\n/cast [m[m[mod:shift] Demoralizing Shout\n",
  "03-interrupt": "#showtooltip Pummel\n/stopattack\n/cast [nostance:3] Berserker Stance\n/cast [@mouseover,harm,nodead][] Pummel\n/startattack\n",
  "04-charge-intercept": "#showtooltip\n/cast [nocombat,nostance:1] Battle Stance\n/cast [nocombat] Charge\n/cast [combat,nostance:3] Berserker Stance\n/cast [combat] Intercept\n/startattack\n",
  "05-rage-burst": "#showtooltip\n/cast Bloodrage\n/cast Berserker Rage\n/cast [m[m[mod:shift] Recklessness\n/use [m[m[mod:shift] 13\n",
  "export-part1": "# Character export without an addon — Part 1/2 (character + talents).\n# Copy the line below (without #) into an in-game macro and press it.\n# A WEXP1|... line appears in chat — paste it into the Hero page field.\n\n/run n=UnitName\"player\"_,c=UnitClass\"player\"l=UnitLevel\"player\"b,p,m=UnitAttackPower\"player\"hp=UnitHealthMax\"player\"t={}for i=1,3 do _,_,q=GetTalentTabInfo(i)t[i]=q end print(\"WEXP1|\"..n..\"|\"..c..\"|\"..l..\"|\"..b+p+m..\"|\"..hp..\"|\"..table.concat(t,\"/\"))\n",
  "export-part2": "# Character export without an addon — Part 2/2 (race + gear).\n# Copy the line below (without #) into an in-game macro and press it.\n# WEXP0|... and WEXP2|... lines appear in chat — paste ALL of them into the same field.\n\n/run _,_,r=UnitRace\"player\"print(\"WEXP0|\"..r)for i=1,19 do l=GetInventoryItemLink(\"player\",i)if l then print(\"WEXP2|\"..i..\"|\"..l)end end\n"
 }
};
