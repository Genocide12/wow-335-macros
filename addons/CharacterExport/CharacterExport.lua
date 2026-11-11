-- CharacterExport — collect character data for the wow-335-macros site.
-- Usage: /cexp  ->  data saved to SavedVariables (run /reload, then copy
-- the "data" string from WTF/Account/<account>/SavedVariables/CharacterExport.lua
-- and paste it on the site import page).

local ADDON_NAME = ...

-- melee combat rating ids (WotLK): hit 6, crit 9, haste 20, expertise 24, ArP 25
local CR_HIT, CR_CRIT, CR_HASTE, CR_EXPERTISE, CR_ARP = 6, 9, 20, 24, 25

local function esc(s)
    s = tostring(s or "")
    s = s:gsub("\\", "\\\\")
    s = s:gsub('"', '\\"')
    s = s:gsub("\r\n", "\\n"):gsub("\n", "\\n"):gsub("\r", " "):gsub("\t", " ")
    s = s:gsub("%c", "")
    return s
end

local function num(v, d)
    d = d or 0
    local s = string.format("%." .. d .. "f", tonumber(v) or 0)
    if s:find("%.", 1, true) then
        s = s:gsub("0+$", ""):gsub("%.$", "")
    end
    return s
end

local function collect()
    local e = {}
    local function add(s) e[#e + 1] = s end

    local name = UnitName("player") or "?"
    local realm = GetRealmName() or "?"
    local classLoc, classFile = UnitClass("player")
    local raceLoc = (UnitRace("player")) or "?"
    local level = UnitLevel("player") or 0

    add('"v":1')
    add('"name":"' .. esc(name) .. '"')
    add('"realm":"' .. esc(realm) .. '"')
    add('"class":"' .. esc(classLoc or "?") .. '"')
    add('"classEn":"' .. esc(classFile or "?") .. '"')
    add('"race":"' .. esc(raceLoc) .. '"')
    add('"level":' .. num(level))
    add('"hp":' .. num(UnitHealthMax("player")))

    local ap = 0
    local b, pos, neg = UnitAttackPower("player")
    if b then ap = b + (pos or 0) + (neg or 0) end
    add('"ap":' .. num(ap))

    local sp, osp = UnitAttackSpeed("player")
    add('"mhSpeed":' .. num(sp, 2))
    add('"ohSpeed":' .. num(osp or 0, 2))

    add('"armor":' .. num(select(2, UnitArmor("player"))))
    add('"rage":' .. num(UnitMana("player")))
    add('"rageMax":' .. num(UnitManaMax("player")))

    add('"hitPct":' .. num(GetCombatRatingBonus(CR_HIT), 2))
    add('"hitRating":' .. num(GetCombatRating(CR_HIT)))
    add('"critPct":' .. num(GetCombatRatingBonus(CR_CRIT), 2))
    add('"hastePct":' .. num(GetCombatRatingBonus(CR_HASTE), 2))
    add('"expertise":' .. num(GetCombatRatingBonus(CR_EXPERTISE)))
    add('"expertiseRating":' .. num(GetCombatRating(CR_EXPERTISE)))
    add('"arpPct":' .. num(GetCombatRatingBonus(CR_ARP), 2))
    add('"arpRating":' .. num(GetCombatRating(CR_ARP)))

    -- talents of the active spec
    local active = 1
    if GetActiveTalentGroup then active = GetActiveTalentGroup() end
    add('"spec":' .. num(active))
    local trees, talents = {}, {}
    for tab = 1, 3 do
        local tname, _, spent = GetTalentTabInfo(tab, false, false, active)
        trees[#trees + 1] = '{"name":"' .. esc(tname or ("tab" .. tab)) .. '","spent":' .. num(spent) .. '}'
        local cnt = GetNumTalents(tab) or 0
        for i = 1, cnt do
            local tn, _, _, _, rank = GetTalentInfo(tab, i, false, false, active)
            if tn and (rank or 0) > 0 then
                talents[#talents + 1] = '"' .. esc(tn .. " " .. rank) .. '"'
            end
        end
    end
    add('"trees":[' .. table.concat(trees, ",") .. ']')
    add('"talents":[' .. table.concat(talents, ",") .. ']')

    -- glyphs (sockets 1-3 major, 4-6 minor)
    local glyphs = {}
    for socket = 1, 6 do
        local ok, enabled, gspell = pcall(GetGlyphSocketInfo, socket)
        if ok and enabled and gspell then
            local gname = GetSpellInfo(gspell)
            if gname then
                glyphs[#glyphs + 1] = '{"socket":' .. socket .. ',"name":"' .. esc(gname) .. '"}'
            end
        end
    end
    add('"glyphs":[' .. table.concat(glyphs, ",") .. ']')

    -- equipment slots 1..19 with item level, quality and enchant id
    local gear = {}
    for slot = 1, 19 do
        local link = GetInventoryItemLink("player", slot)
        if link then
            local id, ench = link:match("item:(%d+):(%d+)")
            local iname, _, quality, ilvl = GetItemInfo(id)
            gear[#gear + 1] = '{"slot":' .. slot .. ',"id":' .. num(id)
                .. ',"name":"' .. esc(iname or ("item:" .. id)) .. '","q":' .. num(quality or 1)
                .. ',"ilvl":' .. num(ilvl or 0) .. ',"ench":' .. num(ench or 0) .. '}'
        end
    end
    add('"gear":[' .. table.concat(gear, ",") .. ']')

    add('"time":"' .. esc(date("%Y-%m-%d %H:%M:%S")) .. '"')
    return "{" .. table.concat(e, ",") .. "}"
end

SLASH_CHAREXPORT1 = "/cexp"
SLASH_CHAREXPORT2 = "/charexport"
SlashCmdList["CHAREXPORT"] = function()
    local json = collect()
    CharacterExportDB = CharacterExportDB or {}
    CharacterExportDB.data = json
    CharacterExportDB.time = date("%Y-%m-%d %H:%M:%S")

    local _, _, hit = json:find('"hitPct":([%-%d%.]+)')
    local _, _, crit = json:find('"critPct":([%-%d%.]+)')
    local _, _, ap = json:find('"ap":([%-%d]+)')
    local _, _, exp = json:find('"expertise":([%-%d]+)')
    DEFAULT_CHAT_FRAME:AddMessage("|cff33ff33CharacterExport:|r "
        .. "AP " .. (ap or "?") .. " | crit " .. (crit or "?") .. "% | hit "
        .. (hit or "?") .. "% | expertise " .. (exp or "?"))
    DEFAULT_CHAT_FRAME:AddMessage("|cff33ff33Next:|r type |cffffff00/reload|r"
        .. ", then copy the \"data\" line from WTF/Account/<account>/SavedVariables/CharacterExport.lua and paste it on the site.")
end

local f = CreateFrame("Frame")
f:RegisterEvent("ADDON_LOADED")
f:SetScript("OnEvent", function(_, _, arg1)
    if arg1 == ADDON_NAME and not CharacterExportDB then
        CharacterExportDB = {}
    end
end)
