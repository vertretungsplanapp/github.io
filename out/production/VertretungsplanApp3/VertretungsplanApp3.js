if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'VertretungsplanApp3'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'VertretungsplanApp3'.");
}
var VertretungsplanApp3 = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var removeClass = Kotlin.kotlin.dom.removeClass_hhb33f$;
  var Unit = Kotlin.kotlin.Unit;
  var substringAfter = Kotlin.kotlin.text.substringAfter_j4ogox$;
  var substringBefore = Kotlin.kotlin.text.substringBefore_j4ogox$;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var startsWith = Kotlin.kotlin.text.startsWith_7epoxm$;
  var removeSurrounding = Kotlin.kotlin.text.removeSurrounding_90ijwr$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var matches = Kotlin.kotlin.text.matches_rjktp$;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var substringAfterLast = Kotlin.kotlin.text.substringAfterLast_j4ogox$;
  var StringBuilder = Kotlin.kotlin.text.StringBuilder;
  var removeSuffix = Kotlin.kotlin.text.removeSuffix_b6aurr$;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var substring = Kotlin.kotlin.text.substring_fc3b62$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var HashMap_init = Kotlin.kotlin.collections.HashMap_init_q3lmfv$;
  OnlineplanManager.prototype = Object.create(Manager.prototype);
  OnlineplanManager.prototype.constructor = OnlineplanManager;
  PageVertretungsplan.prototype = Object.create(Page.prototype);
  PageVertretungsplan.prototype.constructor = PageVertretungsplan;
  function main(args) {
    var tmp$;
    var navbar = (tmp$ = document.getElementsByClassName('ly-navbar')[0]) != null ? tmp$ : Kotlin.throwNPE();
    Navigator_getInstance().initialize_2rdptt$(navbar);
    var actionBar = document.getElementsByClassName('ly-actionbar')[0];
    var contentContainer = document.getElementsByClassName('ly-main')[0];
    if (Kotlin.isType(actionBar, HTMLElement) && Kotlin.isType(contentContainer, HTMLElement)) {
      println('height: ' + Kotlin.toString(actionBar.scrollHeight));
    }
  }
  function createVpCard(entry, vcardsContent) {
    var tmp$, tmp$_0, tmp$_1;
    var vpCard = vcardsContent != null ? vcardsContent.cloneNode(true) : null;
    if (Kotlin.isType(vpCard, Element)) {
      vpCard.removeAttribute('hidden');
      removeClass(vpCard, ['ly-template-vcard']);
      (tmp$ = vpCard.getElementsByClassName('vp-class')[0]) != null ? (tmp$.innerHTML = entry.classesAsString()) : null;
      (tmp$_0 = vpCard.getElementsByClassName('vp-subject')[0]) != null ? (tmp$_0.innerHTML = entry.subjectDisplayString()) : null;
      (tmp$_1 = vpCard.getElementsByClassName('vp-hours')[0]) != null ? (tmp$_1.innerHTML = entry.hours) : null;
      if (entry.cancelled) {
        var subDiv = vpCard.getElementsByTagName('div')[0];
        if (Kotlin.isType(subDiv, HTMLDivElement)) {
          subDiv.style.border = '1px solid #FF5722';
        }
      }
      return vpCard;
    }
    return null;
  }
  function createSection(day, sectionContent) {
    var tmp$;
    var section = sectionContent != null ? sectionContent.cloneNode(true) : null;
    if (Kotlin.isType(section, Element)) {
      section.removeAttribute('hidden');
      removeClass(section, ['ly-template-section']);
      (tmp$ = section.getElementsByClassName('vp-section-title')[0]) != null ? (tmp$.innerHTML = day.fullNameAndDate()) : null;
      return section;
    }
    return null;
  }
  function createLastUpdated(lastUpdated, content) {
    var tmp$;
    var section = content != null ? content.cloneNode(true) : null;
    if (Kotlin.isType(section, Element)) {
      section.removeAttribute('hidden');
      removeClass(section, ['ly-template-lastupdated']);
      (tmp$ = section.getElementsByClassName('vp-lastupdated-date')[0]) != null ? (tmp$.innerHTML = lastUpdated) : null;
      return section;
    }
    return null;
  }
  var VERTRETUNGSPLAN_MIRROR_URL;
  var VERTRETUNGSPLAN_LOCAL_URL;
  var VERTRETUNGSPLAN_URL;
  var VERTRETUNGSPLAN_TEXT;
  function Decoder(content) {
    this.content_0 = content;
  }
  Decoder.prototype.decode = function () {
    var tmp$, tmp$_0;
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.content_0, 'text/html');
    var headerTable = (tmp$ = doc.body) != null ? tmp$.getElementsByClassName('mon_head') : null;
    var lastUpdated = this.decodeHeaderBlock_0(headerTable);
    var todayBlock = {v: null};
    var tomorrowBlock = {v: null};
    var tables = (tmp$_0 = doc.body) != null ? tmp$_0.getElementsByTagName('center') : null;
    if (tables != null) {
      var todayTable = tables[0];
      todayBlock.v = this.decodeDayBlock_0(todayTable, true);
      var tomorrowTable = tables[1];
      tomorrowBlock.v = this.decodeDayBlock_0(tomorrowTable, false);
    }
    return new Vertretungsplan(todayBlock.v, tomorrowBlock.v, lastUpdated);
  };
  Decoder.prototype.decodeDayBlock_0 = function (table, isToday) {
    if (table != null) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
      var title = (tmp$ = table.getElementsByClassName('mon_title')[0]) != null ? tmp$.innerHTML : null;
      var titleDayName = (tmp$_0 = title != null ? substringAfter(title, ' ') : null) != null ? tmp$_0 : '';
      var titleDayDate = (tmp$_1 = title != null ? substringBefore(title, ' ') : null) != null ? tmp$_1 : '';
      var day = new VPDay(titleDayName, titleDayDate, isToday);
      var infoTable = table.getElementsByClassName('info')[0];
      var dayMessagesList = this.decodeDayMessagesBlock_0(infoTable);
      var listTable = (tmp$_3 = (tmp$_2 = table.getElementsByClassName('mon_list')[0]) != null ? tmp$_2.getElementsByTagName('tbody') : null) != null ? tmp$_3[0] : null;
      var entryList = this.decodeEntryListBlock_0(listTable);
      return new VPBlock(day, entryList, dayMessagesList);
    }
    return null;
  };
  var trim = Kotlin.kotlin.text.trim_gw00vp$;
  function Decoder$decodeEntryListBlock$lambda(column) {
    var tmp$;
    var $receiver = replace((tmp$ = column != null ? column.textContent : null) != null ? tmp$ : '', '&nbsp;', '');
    var tmp$_0;
    return trim(Kotlin.isCharSequence(tmp$_0 = $receiver) ? tmp$_0 : Kotlin.throwCCE()).toString();
  }
  Decoder.prototype.decodeEntryListBlock_0 = function (listTable) {
    var defaultString = Decoder$decodeEntryListBlock$lambda;
    var entryList = ArrayList_init();
    if (listTable != null) {
      var tmp$, tmp$_0;
      var rows = listTable.getElementsByTagName('tr');
      var lastEntry = {v: null};
      tmp$ = rows.length;
      for (var i = 0; i < tmp$; i++) {
        if ((tmp$_0 = rows[i]) != null) {
          var tmp$_1, tmp$_2;
          if (Kotlin.equals(tmp$_0.className, 'list even') || Kotlin.equals(tmp$_0.className, 'list odd')) {
            var columns = tmp$_0.getElementsByTagName('td');
            var htmlClasses = defaultString(columns[1]);
            var classes = ArrayList_init();
            var hasClassBrackets = startsWith(htmlClasses, '(');
            var tmp$_3;
            tmp$_3 = split(removeSurrounding(htmlClasses, '(', ')'), [',']).iterator();
            while (tmp$_3.hasNext()) {
              var element = tmp$_3.next();
              var tmp$_4;
              var name = trim(Kotlin.isCharSequence(tmp$_4 = element) ? tmp$_4 : Kotlin.throwCCE()).toString();
              if (matches(name, '[0-9].+'))
                classes.add_11rb$(new VPSchoolclass(name));
              else
                classes.add_11rb$(new VPOtherclass(name));
            }
            var teachers = new VPEntry$Info(defaultString(columns[5]), defaultString(columns[2]));
            var subjects = new VPEntry$Info(defaultString(columns[6]), defaultString(columns[3]));
            var rooms = new VPEntry$Info(defaultString(columns[7]), defaultString(columns[4]));
            var hours = defaultString(columns[0]);
            var extraText = defaultString(columns[8]);
            var movedFrom = defaultString(columns[9]);
            var coSupervision = contains(defaultString(columns[10]), 'x');
            var cancelled = contains(defaultString(columns[11]), 'x');
            var tmp$_5 = teachers.isEmpty() && subjects.isEmpty() && rooms.isEmpty();
            if (tmp$_5) {
              tmp$_5 = hours.length === 0;
            }
            var tmp$_6 = tmp$_5;
            if (tmp$_6) {
              tmp$_6 = movedFrom.length === 0;
            }
            var tmp$_7 = tmp$_6;
            if (tmp$_7) {
              tmp$_7 = !(extraText.length === 0);
            }
            if (tmp$_7) {
              (tmp$_2 = lastEntry.v) != null ? (tmp$_2.extraText = Kotlin.toString((tmp$_1 = lastEntry.v) != null ? tmp$_1.extraText : null) + ' ' + extraText) : null;
            }
             else {
              var entry = new VPEntry(classes, hasClassBrackets, teachers, subjects, rooms, hours, cancelled, coSupervision, extraText, movedFrom);
              lastEntry.v = entry;
              entryList.add_11rb$(entry);
            }
          }
        }
      }
    }
    return entryList;
  };
  Decoder.prototype.decodeDayMessagesBlock_0 = function (infoTable) {
    var dayMessagesList = ArrayList_init();
    if (infoTable != null) {
      var tmp$, tmp$_0, tmp$_1;
      var rows = infoTable.getElementsByTagName('td');
      tmp$ = rows.length;
      for (var i = 0; i < tmp$; i++) {
        if ((tmp$_1 = (tmp$_0 = rows[i]) != null ? tmp$_0.innerHTML : null) != null) {
          dayMessagesList.add_11rb$(new VPDaymessage(tmp$_1));
        }
      }
    }
    return dayMessagesList;
  };
  Decoder.prototype.decodeHeaderBlock_0 = function (table) {
    if (table != null) {
      var tmp$;
      var rows = (tmp$ = table[0]) != null ? tmp$.getElementsByTagName('td') : null;
      if (rows != null) {
        var tmp$_0;
        var fromRow = (tmp$_0 = rows[2]) != null ? tmp$_0.getElementsByTagName('p') : null;
        if (fromRow != null) {
          var tmp$_1, tmp$_2, tmp$_3;
          if ((tmp$_3 = (tmp$_2 = (tmp$_1 = fromRow[0]) != null ? tmp$_1.innerHTML : null) != null ? substringAfterLast(tmp$_2, 'Stand: ') : null) != null) {
            return tmp$_3;
          }
        }
      }
    }
    return '';
  };
  Decoder.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Decoder',
    interfaces: []
  };
  function VPBlock(day, entries, messages) {
    this.day = day;
    this.entries = entries;
    this.messages = messages;
  }
  VPBlock.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'VPBlock',
    interfaces: []
  };
  VPBlock.prototype.component1 = function () {
    return this.day;
  };
  VPBlock.prototype.component2 = function () {
    return this.entries;
  };
  VPBlock.prototype.component3 = function () {
    return this.messages;
  };
  VPBlock.prototype.copy_t3sa7d$ = function (day, entries, messages) {
    return new VPBlock(day === void 0 ? this.day : day, entries === void 0 ? this.entries : entries, messages === void 0 ? this.messages : messages);
  };
  VPBlock.prototype.toString = function () {
    return 'VPBlock(day=' + Kotlin.toString(this.day) + (', entries=' + Kotlin.toString(this.entries)) + (', messages=' + Kotlin.toString(this.messages)) + ')';
  };
  VPBlock.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.day) | 0;
    result = result * 31 + Kotlin.hashCode(this.entries) | 0;
    result = result * 31 + Kotlin.hashCode(this.messages) | 0;
    return result;
  };
  VPBlock.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.day, other.day) && Kotlin.equals(this.entries, other.entries) && Kotlin.equals(this.messages, other.messages)))));
  };
  function VPClass() {
  }
  VPClass.$metadata$ = {
    kind: Kotlin.Kind.INTERFACE,
    simpleName: 'VPClass',
    interfaces: []
  };
  function VPDay(dayName, dayDate, today) {
    this.dayName = dayName;
    this.dayDate = dayDate;
    this.today = today;
  }
  VPDay.prototype.fullNameAndDate = function () {
    return this.dayName + ', ' + this.dayDate;
  };
  VPDay.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'VPDay',
    interfaces: []
  };
  VPDay.prototype.component1 = function () {
    return this.dayName;
  };
  VPDay.prototype.component2 = function () {
    return this.dayDate;
  };
  VPDay.prototype.component3 = function () {
    return this.today;
  };
  VPDay.prototype.copy_qz9155$ = function (dayName, dayDate, today) {
    return new VPDay(dayName === void 0 ? this.dayName : dayName, dayDate === void 0 ? this.dayDate : dayDate, today === void 0 ? this.today : today);
  };
  VPDay.prototype.toString = function () {
    return 'VPDay(dayName=' + Kotlin.toString(this.dayName) + (', dayDate=' + Kotlin.toString(this.dayDate)) + (', today=' + Kotlin.toString(this.today)) + ')';
  };
  VPDay.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.dayName) | 0;
    result = result * 31 + Kotlin.hashCode(this.dayDate) | 0;
    result = result * 31 + Kotlin.hashCode(this.today) | 0;
    return result;
  };
  VPDay.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.dayName, other.dayName) && Kotlin.equals(this.dayDate, other.dayDate) && Kotlin.equals(this.today, other.today)))));
  };
  function VPDaymessage(message) {
    this.message = message;
  }
  VPDaymessage.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'VPDaymessage',
    interfaces: []
  };
  VPDaymessage.prototype.component1 = function () {
    return this.message;
  };
  VPDaymessage.prototype.copy_61zpoe$ = function (message) {
    return new VPDaymessage(message === void 0 ? this.message : message);
  };
  VPDaymessage.prototype.toString = function () {
    return 'VPDaymessage(message=' + Kotlin.toString(this.message) + ')';
  };
  VPDaymessage.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.message) | 0;
    return result;
  };
  VPDaymessage.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.message, other.message))));
  };
  function VPEntry(classes, hasClassBrackets, teachers, subjects, rooms, hours, cancelled, coSupervision, extraText, movedFrom) {
    this.classes = classes;
    this.hasClassBrackets = hasClassBrackets;
    this.teachers = teachers;
    this.subjects = subjects;
    this.rooms = rooms;
    this.hours = hours;
    this.cancelled = cancelled;
    this.coSupervision = coSupervision;
    this.extraText = extraText;
    this.movedFrom = movedFrom;
    this.displayTeacher_0 = false;
  }
  VPEntry.prototype.getTimeSection = function () {
    return contains(this.hours, '1') || contains(this.hours, '2') ? 0 : contains(this.hours, '3') || contains(this.hours, '4') ? 1 : contains(this.hours, '5') || contains(this.hours, '6') ? 2 : contains(this.hours, '7') || contains(this.hours, '8') ? 3 : -1;
  };
  VPEntry.prototype.classesAsString = function () {
    var builder = new StringBuilder();
    var tmp$;
    tmp$ = this.classes.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      builder.append_gw00v9$(element + ', ');
    }
    return this.hasClassBrackets ? '(' + removeSuffix(builder, ', ') + ')' : removeSuffix(builder, ', ').toString();
  };
  VPEntry.prototype.subjectDisplayString = function () {
    return this.displayTeacher_0 ? !(this.teachers.normal.length === 0) ? (!(this.subjects.normal.length === 0) ? '(' + this.subjects.normal + ' / ' : '(/ ') + (this.teachers.normal + ')') : this.subjectNormalBracketedString_0() : this.subjects.normal.length === 0 ? '(/ ' + this.rooms.normal + ')' : this.subjectNormalBracketedString_0();
  };
  VPEntry.prototype.subjectNormalBracketedString_0 = function () {
    return this.subjects.normal.length === 0 ? '' : '(' + this.subjects.normal + ')';
  };
  function VPEntry$Info(normal, change) {
    this.normal = normal;
    this.change = change;
  }
  VPEntry$Info.prototype.hasChange = function () {
    return this.normal !== this.change;
  };
  VPEntry$Info.prototype.isEmpty = function () {
    var tmp$ = this.normal.length === 0;
    if (tmp$) {
      tmp$ = this.change.length === 0;
    }
    return tmp$;
  };
  VPEntry$Info.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Info',
    interfaces: []
  };
  VPEntry$Info.prototype.component1 = function () {
    return this.normal;
  };
  VPEntry$Info.prototype.component2 = function () {
    return this.change;
  };
  VPEntry$Info.prototype.copy_puj7f4$ = function (normal, change) {
    return new VPEntry$Info(normal === void 0 ? this.normal : normal, change === void 0 ? this.change : change);
  };
  VPEntry$Info.prototype.toString = function () {
    return 'Info(normal=' + Kotlin.toString(this.normal) + (', change=' + Kotlin.toString(this.change)) + ')';
  };
  VPEntry$Info.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.normal) | 0;
    result = result * 31 + Kotlin.hashCode(this.change) | 0;
    return result;
  };
  VPEntry$Info.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.normal, other.normal) && Kotlin.equals(this.change, other.change)))));
  };
  VPEntry.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'VPEntry',
    interfaces: []
  };
  VPEntry.prototype.component1 = function () {
    return this.classes;
  };
  VPEntry.prototype.component2 = function () {
    return this.hasClassBrackets;
  };
  VPEntry.prototype.component3 = function () {
    return this.teachers;
  };
  VPEntry.prototype.component4 = function () {
    return this.subjects;
  };
  VPEntry.prototype.component5 = function () {
    return this.rooms;
  };
  VPEntry.prototype.component6 = function () {
    return this.hours;
  };
  VPEntry.prototype.component7 = function () {
    return this.cancelled;
  };
  VPEntry.prototype.component8 = function () {
    return this.coSupervision;
  };
  VPEntry.prototype.component9 = function () {
    return this.extraText;
  };
  VPEntry.prototype.component10 = function () {
    return this.movedFrom;
  };
  VPEntry.prototype.copy_3unkw4$ = function (classes, hasClassBrackets, teachers, subjects, rooms, hours, cancelled, coSupervision, extraText, movedFrom) {
    return new VPEntry(classes === void 0 ? this.classes : classes, hasClassBrackets === void 0 ? this.hasClassBrackets : hasClassBrackets, teachers === void 0 ? this.teachers : teachers, subjects === void 0 ? this.subjects : subjects, rooms === void 0 ? this.rooms : rooms, hours === void 0 ? this.hours : hours, cancelled === void 0 ? this.cancelled : cancelled, coSupervision === void 0 ? this.coSupervision : coSupervision, extraText === void 0 ? this.extraText : extraText, movedFrom === void 0 ? this.movedFrom : movedFrom);
  };
  VPEntry.prototype.toString = function () {
    return 'VPEntry(classes=' + Kotlin.toString(this.classes) + (', hasClassBrackets=' + Kotlin.toString(this.hasClassBrackets)) + (', teachers=' + Kotlin.toString(this.teachers)) + (', subjects=' + Kotlin.toString(this.subjects)) + (', rooms=' + Kotlin.toString(this.rooms)) + (', hours=' + Kotlin.toString(this.hours)) + (', cancelled=' + Kotlin.toString(this.cancelled)) + (', coSupervision=' + Kotlin.toString(this.coSupervision)) + (', extraText=' + Kotlin.toString(this.extraText)) + (', movedFrom=' + Kotlin.toString(this.movedFrom)) + ')';
  };
  VPEntry.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.classes) | 0;
    result = result * 31 + Kotlin.hashCode(this.hasClassBrackets) | 0;
    result = result * 31 + Kotlin.hashCode(this.teachers) | 0;
    result = result * 31 + Kotlin.hashCode(this.subjects) | 0;
    result = result * 31 + Kotlin.hashCode(this.rooms) | 0;
    result = result * 31 + Kotlin.hashCode(this.hours) | 0;
    result = result * 31 + Kotlin.hashCode(this.cancelled) | 0;
    result = result * 31 + Kotlin.hashCode(this.coSupervision) | 0;
    result = result * 31 + Kotlin.hashCode(this.extraText) | 0;
    result = result * 31 + Kotlin.hashCode(this.movedFrom) | 0;
    return result;
  };
  VPEntry.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.classes, other.classes) && Kotlin.equals(this.hasClassBrackets, other.hasClassBrackets) && Kotlin.equals(this.teachers, other.teachers) && Kotlin.equals(this.subjects, other.subjects) && Kotlin.equals(this.rooms, other.rooms) && Kotlin.equals(this.hours, other.hours) && Kotlin.equals(this.cancelled, other.cancelled) && Kotlin.equals(this.coSupervision, other.coSupervision) && Kotlin.equals(this.extraText, other.extraText) && Kotlin.equals(this.movedFrom, other.movedFrom)))));
  };
  function VPOtherclass(name) {
    this.name = name;
  }
  VPOtherclass.prototype.fullName = function () {
    return this.name;
  };
  VPOtherclass.prototype.toString = function () {
    return this.fullName();
  };
  VPOtherclass.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'VPOtherclass',
    interfaces: [VPClass]
  };
  function VPSchoolclass(toParse) {
    this.year_tg0m8x$_0 = 0;
    this.extension_38xtuh$_0 = '';
    if (startsWith(toParse, '11') || startsWith(toParse, '12') || startsWith(toParse, '13')) {
      this.year = toInt(substring(toParse, new IntRange(0, 1)));
    }
     else {
      this.year = toInt(substring(toParse, until(0, 1)));
      this.extension = toParse.substring(1);
    }
  }
  Object.defineProperty(VPSchoolclass.prototype, 'year', {
    get: function () {
      return this.year_tg0m8x$_0;
    },
    set: function (year) {
      this.year_tg0m8x$_0 = year;
    }
  });
  Object.defineProperty(VPSchoolclass.prototype, 'extension', {
    get: function () {
      return this.extension_38xtuh$_0;
    },
    set: function (extension) {
      this.extension_38xtuh$_0 = extension;
    }
  });
  VPSchoolclass.prototype.fullName = function () {
    return this.year.toString() + this.extension;
  };
  VPSchoolclass.prototype.toString = function () {
    return this.fullName();
  };
  VPSchoolclass.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'VPSchoolclass',
    interfaces: [VPClass]
  };
  function Vertretungsplan(today, tomorrow, lastUpdated) {
    this.today = today;
    this.tomorrow = tomorrow;
    this.lastUpdated = lastUpdated;
  }
  Vertretungsplan.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Vertretungsplan',
    interfaces: []
  };
  Vertretungsplan.prototype.component1 = function () {
    return this.today;
  };
  Vertretungsplan.prototype.component2 = function () {
    return this.tomorrow;
  };
  Vertretungsplan.prototype.component3 = function () {
    return this.lastUpdated;
  };
  Vertretungsplan.prototype.copy_r3df6$ = function (today, tomorrow, lastUpdated) {
    return new Vertretungsplan(today === void 0 ? this.today : today, tomorrow === void 0 ? this.tomorrow : tomorrow, lastUpdated === void 0 ? this.lastUpdated : lastUpdated);
  };
  Vertretungsplan.prototype.toString = function () {
    return 'Vertretungsplan(today=' + Kotlin.toString(this.today) + (', tomorrow=' + Kotlin.toString(this.tomorrow)) + (', lastUpdated=' + Kotlin.toString(this.lastUpdated)) + ')';
  };
  Vertretungsplan.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.today) | 0;
    result = result * 31 + Kotlin.hashCode(this.tomorrow) | 0;
    result = result * 31 + Kotlin.hashCode(this.lastUpdated) | 0;
    return result;
  };
  Vertretungsplan.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.today, other.today) && Kotlin.equals(this.tomorrow, other.tomorrow) && Kotlin.equals(this.lastUpdated, other.lastUpdated)))));
  };
  function Manager(url, converter, authorization, charset) {
    if (authorization === void 0)
      authorization = '';
    if (charset === void 0)
      charset = 'UTF-8';
    this.url = url;
    this.converter_vhwdi2$_0 = converter;
    this.authorization = authorization;
    this.charset = charset;
    this.fileContent_i9a3k9$_0 = '';
    this.currentFile_1higk1$_0 = null;
  }
  Manager.prototype.fetchFile = function () {
    return VERTRETUNGSPLAN_TEXT;
  };
  Manager.prototype.get = function () {
    var downloaded = this.fetchFile();
    if (Kotlin.equals(downloaded, this.fileContent_i9a3k9$_0))
      return this.currentFile_1higk1$_0;
    this.currentFile_1higk1$_0 = this.converter_vhwdi2$_0(downloaded);
    return this.currentFile_1higk1$_0;
  };
  Manager.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Manager',
    interfaces: []
  };
  function OnlineplanManager() {
    OnlineplanManager_instance = this;
    Manager.call(this, new URL(VERTRETUNGSPLAN_URL), Kotlin.getCallableRef('parseVertretungsplan', function ($receiver, content) {
      return $receiver.parseVertretungsplan_0(content);
    }.bind(null, OnlineplanManager_getInstance())), void 0, 'ISO-8859-1');
  }
  OnlineplanManager.prototype.parseVertretungsplan_0 = function (content) {
    return (new Decoder(content)).decode();
  };
  OnlineplanManager.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'OnlineplanManager',
    interfaces: [Manager]
  };
  var OnlineplanManager_instance = null;
  function OnlineplanManager_getInstance() {
    if (OnlineplanManager_instance === null) {
      new OnlineplanManager();
    }
    return OnlineplanManager_instance;
  }
  function Navigator() {
    Navigator_instance = this;
    this.pageDashboard = new Option('page:dashboard', null);
    this.pageVPlan = new Option('page:vplan', null);
    this.pageMyVPlan = new Option('page:vplan', null);
    this.pageDaymsgs = new Option('page:daymsgs', null);
    this.pageProfiles = new Option('page:profiles', null);
    this.pageSettings = new Option('page:settings', null);
    this.tabDashboard_0 = null;
    this.tabVPlan_0 = null;
    this.tabMyVPlan_0 = null;
    this.tabDaymsgs_0 = null;
    this.tabProfiles_0 = null;
    this.tabSettings_0 = null;
    this.pages_0 = HashMap_init();
    this.current_0 = null;
  }
  function Navigator$initialize$lambda(this$Navigator) {
    return function (it) {
      this$Navigator.changeTo_u4w5b9$(this$Navigator.pageDashboard);
      return Unit;
    };
  }
  function Navigator$initialize$lambda_0(this$Navigator) {
    return function (it) {
      this$Navigator.changeTo_u4w5b9$(this$Navigator.pageVPlan);
      return Unit;
    };
  }
  function Navigator$initialize$lambda_1(this$Navigator) {
    return function (it) {
      this$Navigator.changeTo_u4w5b9$(this$Navigator.pageMyVPlan);
      return Unit;
    };
  }
  function Navigator$initialize$lambda_2(this$Navigator) {
    return function (it) {
      this$Navigator.changeTo_u4w5b9$(this$Navigator.pageDaymsgs);
      return Unit;
    };
  }
  function Navigator$initialize$lambda_3(this$Navigator) {
    return function (it) {
      this$Navigator.changeTo_u4w5b9$(this$Navigator.pageProfiles);
      return Unit;
    };
  }
  function Navigator$initialize$lambda_4(this$Navigator) {
    return function (it) {
      this$Navigator.changeTo_u4w5b9$(this$Navigator.pageSettings);
      return Unit;
    };
  }
  Navigator.prototype.initialize_2rdptt$ = function (navbar) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    this.tabDashboard_0 = navbar.getElementsByClassName('nv-dashboard')[0];
    (tmp$ = this.tabDashboard_0) != null ? (tmp$.addEventListener('click', Navigator$initialize$lambda(this)), Unit) : null;
    this.tabVPlan_0 = navbar.getElementsByClassName('nv-vplan')[0];
    (tmp$_0 = this.tabVPlan_0) != null ? (tmp$_0.addEventListener('click', Navigator$initialize$lambda_0(this)), Unit) : null;
    this.tabMyVPlan_0 = navbar.getElementsByClassName('nv-my-vplan')[0];
    (tmp$_1 = this.tabMyVPlan_0) != null ? (tmp$_1.addEventListener('click', Navigator$initialize$lambda_1(this)), Unit) : null;
    this.tabDaymsgs_0 = navbar.getElementsByClassName('nv-daymsgs')[0];
    (tmp$_2 = this.tabDaymsgs_0) != null ? (tmp$_2.addEventListener('click', Navigator$initialize$lambda_2(this)), Unit) : null;
    this.tabProfiles_0 = navbar.getElementsByClassName('nv-profiles')[0];
    (tmp$_3 = this.tabProfiles_0) != null ? (tmp$_3.addEventListener('click', Navigator$initialize$lambda_3(this)), Unit) : null;
    this.tabSettings_0 = navbar.getElementsByClassName('nv-settings')[0];
    (tmp$_4 = this.tabSettings_0) != null ? (tmp$_4.addEventListener('click', Navigator$initialize$lambda_4(this)), Unit) : null;
    this.pages_0.put_xwzc9p$(this.pageVPlan.name, new PageVertretungsplan());
  };
  var Map = Kotlin.kotlin.collections.Map;
  Navigator.prototype.changeTo_u4w5b9$ = function (next) {
    var tmp$, tmp$_0, tmp$_1;
    println('Changing to page ' + next.name + '...');
    if ((tmp$ = this.current_0) != null) {
      if (tmp$ === next)
        return;
    }
    if ((tmp$_0 = this.current_0) != null) {
      var tmp$_2, tmp$_3;
      if (Kotlin.equals(tmp$_0.name, next.name)) {
        (tmp$_2 = next.runBefore) != null ? tmp$_2() : null;
        (tmp$_3 = this.pages_0.get_11rb$(tmp$_0.name)) != null ? (tmp$_3.reload(), Unit) : null;
        this.current_0 = next;
        return;
      }
    }
    if ((tmp$_1 = this.pages_0.get_11rb$(next.name)) != null) {
      var tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8;
      tmp$_5 = this.pages_0;
      var key = (tmp$_4 = this.current_0) != null ? tmp$_4.name : null;
      var tmp$_9;
      (tmp$_7 = (tmp$_6 = (Kotlin.isType(tmp$_9 = tmp$_5, Map) ? tmp$_9 : Kotlin.throwCCE()).get_11rb$(key)) != null ? tmp$_6.page : null) != null ? (tmp$_7.setAttribute('hidden', 'true'), Unit) : null;
      (tmp$_8 = next.runBefore) != null ? tmp$_8() : null;
      tmp$_1.page.removeAttribute('hidden');
      tmp$_1.load();
      this.current_0 = next;
    }
  };
  Navigator.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Navigator',
    interfaces: []
  };
  var Navigator_instance = null;
  function Navigator_getInstance() {
    if (Navigator_instance === null) {
      new Navigator();
    }
    return Navigator_instance;
  }
  function Option(name, runBefore) {
    this.name = name;
    this.runBefore = runBefore;
  }
  Option.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Option',
    interfaces: []
  };
  function Page(layoutClassName) {
    var tmp$;
    this.page = (tmp$ = document.getElementsByClassName(layoutClassName)[0]) != null ? tmp$ : Kotlin.throwNPE();
  }
  Page.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Page',
    interfaces: []
  };
  function PageVertretungsplan() {
    Page.call(this, 'ly-page-vplan');
    this.templateVpCard_0 = this.page.getElementsByClassName('ly-template-vcard')[0];
    this.templateSection_0 = this.page.getElementsByClassName('ly-template-section')[0];
    this.templateLastUpdated_0 = this.page.getElementsByClassName('ly-template-lastupdated')[0];
  }
  PageVertretungsplan.prototype.load = function () {
    var mainContainer = this.page.getElementsByClassName('vp-main-container')[0];
    if (mainContainer != null) {
      var tmp$, tmp$_0;
      while (mainContainer.firstChild !== null) {
        if ((tmp$ = mainContainer.firstChild) != null) {
          mainContainer.removeChild(tmp$);
        }
      }
      if ((tmp$_0 = OnlineplanManager_getInstance().get()) != null) {
        var tmp$_1;
        this.displayBlock_0(tmp$_0.today, mainContainer);
        this.displayBlock_0(tmp$_0.tomorrow, mainContainer);
        (tmp$_1 = this.createLastUpdated_0(tmp$_0.lastUpdated, this.templateLastUpdated_0)) != null && mainContainer.appendChild(tmp$_1);
      }
    }
  };
  PageVertretungsplan.prototype.reload = function () {
    this.load();
  };
  PageVertretungsplan.prototype.displayBlock_0 = function (block, mainContainer) {
    if (block != null) {
      var tmp$;
      if ((tmp$ = this.createSection_0(block.day, this.templateSection_0)) != null) {
        mainContainer.appendChild(tmp$);
      }
      var tmp$_0;
      tmp$_0 = block.entries.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        var tmp$_1;
        if ((tmp$_1 = this.createVpCard_0(element, this.templateVpCard_0)) != null) {
          mainContainer.appendChild(tmp$_1);
        }
      }
    }
  };
  PageVertretungsplan.prototype.createVpCard_0 = function (entry, vcardsContent) {
    var tmp$, tmp$_0, tmp$_1;
    var vpCard = vcardsContent != null ? vcardsContent.cloneNode(true) : null;
    if (Kotlin.isType(vpCard, Element)) {
      vpCard.removeAttribute('hidden');
      removeClass(vpCard, ['ly-template-vcard']);
      (tmp$ = vpCard.getElementsByClassName('vp-class')[0]) != null ? (tmp$.innerHTML = entry.classesAsString()) : null;
      (tmp$_0 = vpCard.getElementsByClassName('vp-subject')[0]) != null ? (tmp$_0.innerHTML = entry.subjectDisplayString()) : null;
      (tmp$_1 = vpCard.getElementsByClassName('vp-hours')[0]) != null ? (tmp$_1.innerHTML = entry.hours) : null;
      if (entry.cancelled) {
        var subDiv = vpCard.getElementsByTagName('div')[0];
        if (Kotlin.isType(subDiv, HTMLDivElement)) {
          subDiv.style.border = '1px solid #FF5722';
        }
      }
      return vpCard;
    }
    return null;
  };
  PageVertretungsplan.prototype.createSection_0 = function (day, sectionContent) {
    var tmp$;
    var section = sectionContent != null ? sectionContent.cloneNode(true) : null;
    if (Kotlin.isType(section, Element)) {
      section.removeAttribute('hidden');
      removeClass(section, ['ly-template-section']);
      (tmp$ = section.getElementsByClassName('vp-section-title')[0]) != null ? (tmp$.innerHTML = day.fullNameAndDate()) : null;
      return section;
    }
    return null;
  };
  PageVertretungsplan.prototype.createLastUpdated_0 = function (lastUpdated, content) {
    var tmp$;
    var section = content != null ? content.cloneNode(true) : null;
    if (Kotlin.isType(section, Element)) {
      section.removeAttribute('hidden');
      removeClass(section, ['ly-template-lastupdated']);
      (tmp$ = section.getElementsByClassName('vp-lastupdated-date')[0]) != null ? (tmp$.innerHTML = lastUpdated) : null;
      return section;
    }
    return null;
  };
  PageVertretungsplan.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'PageVertretungsplan',
    interfaces: [Page]
  };
  _.main_kand9s$ = main;
  _.createVpCard_l669ym$ = createVpCard;
  _.createSection_yq8dtw$ = createSection;
  _.createLastUpdated_vhwtde$ = createLastUpdated;
  var package$lvideos = _.lvideos || (_.lvideos = {});
  var package$vplan3 = package$lvideos.vplan3 || (package$lvideos.vplan3 = {});
  Object.defineProperty(package$vplan3, 'VERTRETUNGSPLAN_MIRROR_URL', {
    get: function () {
      return VERTRETUNGSPLAN_MIRROR_URL;
    }
  });
  Object.defineProperty(package$vplan3, 'VERTRETUNGSPLAN_LOCAL_URL', {
    get: function () {
      return VERTRETUNGSPLAN_LOCAL_URL;
    }
  });
  Object.defineProperty(package$vplan3, 'VERTRETUNGSPLAN_URL', {
    get: function () {
      return VERTRETUNGSPLAN_URL;
    }
  });
  Object.defineProperty(package$vplan3, 'VERTRETUNGSPLAN_TEXT', {
    get: function () {
      return VERTRETUNGSPLAN_TEXT;
    }
  });
  var package$decoder = package$vplan3.decoder || (package$vplan3.decoder = {});
  package$decoder.Decoder = Decoder;
  package$decoder.VPBlock = VPBlock;
  package$decoder.VPClass = VPClass;
  package$decoder.VPDay = VPDay;
  package$decoder.VPDaymessage = VPDaymessage;
  VPEntry.Info = VPEntry$Info;
  package$decoder.VPEntry = VPEntry;
  package$decoder.VPOtherclass = VPOtherclass;
  package$decoder.VPSchoolclass = VPSchoolclass;
  package$decoder.Vertretungsplan = Vertretungsplan;
  var package$management = package$vplan3.management || (package$vplan3.management = {});
  var package$downloaders = package$management.downloaders || (package$management.downloaders = {});
  package$downloaders.Manager = Manager;
  Object.defineProperty(package$downloaders, 'OnlineplanManager', {
    get: OnlineplanManager_getInstance
  });
  var package$ui = package$vplan3.ui || (package$vplan3.ui = {});
  var package$navigation = package$ui.navigation || (package$ui.navigation = {});
  Object.defineProperty(package$navigation, 'Navigator', {
    get: Navigator_getInstance
  });
  package$navigation.Option = Option;
  var package$pages = package$ui.pages || (package$ui.pages = {});
  package$pages.Page = Page;
  package$pages.PageVertretungsplan = PageVertretungsplan;
  VERTRETUNGSPLAN_MIRROR_URL = 'http://information.lvideos.de/lvideos.vplan3/mirror/fetch_cors.php?' + 'url=http%3A%2F%2Fvertretungsplan.herderschule-lueneburg.de%2FKlassenplan.htm';
  VERTRETUNGSPLAN_LOCAL_URL = '/plan.html';
  VERTRETUNGSPLAN_URL = VERTRETUNGSPLAN_MIRROR_URL;
  VERTRETUNGSPLAN_TEXT = '<html>\n' + '<head>\n' + '<title>Untis 2018 Vertretungsplan<\/title>\n' + '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">\n' + '<meta http-equiv="expires" content="0">\n' + '<style type="text/css">\n' + '\n' + 'body { margin-top: 0px; margin-left: 20px; margin-right: 20px;\n' + 'background: #fff; color: #272727; font: 80% Arial, Helvetica, sans-serif; }\n' + '\n' + 'h1 { color: #ee7f00; font-size: 150%; font-weight: normal;}\n' + 'h1 strong { font-size: 200%; font-weight: normal; }\n' + 'h2 { font-size: 125%;}\n' + '\n' + 'h1, h2 { margin: 0; padding: 0;}\n' + '\n' + '\n' + 'th { background: #000; color: #fff; }\n' + 'table.mon_list th, td { padding: 8px 4px;}\n' + '\n' + '\n' + '.mon_title \n' + '{ \n' + '\tfont-weight: bold; \n' + '\tfont-size: 120%; \n' + '\tclear: both; \n' + '\tmargin: 0; \n' + '}\n' + '\n' + 'table.info\n' + '{\n' + '\tcolor: #000000; \n' + '\tfont-size: 100%;\n' + '\tborder: 1px;\n' + '\tborder-style:solid;\n' + '\tborder-collapse:collapse;\n' + '\tpadding: 8px 4px;\n' + '}\n' + '\n' + 'table.mon_list\n' + '{\n' + '\tcolor: #000000; \n' + '\twidth: 100%; \n' + '\tfont-size: 100%;\n' + '\tborder: 1px;\n' + '\tborder-style:solid;\n' + '\tborder-collapse:collapse;\n' + '}\n' + '\n' + 'table.mon_head\n' + '{\n' + '\tcolor: #000000; \n' + '\twidth: 100%; \n' + '\tfont-size: 100%;\n' + '}\n' + '\n' + 'td.info,\n' + 'th.list,\n' + 'td.list,\n' + 'tr.list\n' + '{\n' + '\tborder: 1px;\n' + '\tborder-style: solid;\n' + '\tborder-color: black;\n' + '\tmargin: 0px;\n' + '\tborder-collapse:collapse;\n' + '\tpadding: 3px;\n' + '}\n' + '\n' + 'tr.odd { background: #fad3a6; }\n' + 'tr.even { background: #fdecd9; }\n' + '\n' + '<\/style>\n' + '<\/head>\n' + '\n' + '<body>\n' + '<table class="mon_head">\n' + '    <tr>\n' + '        <td valign="bottom"><h1><strong>Untis<\/strong> 2018 <!-- Info-Stundenplan --><\/h1><\/td>\n' + '        <td valign="bottom"><\/td>\n' + '        <td align="right" valign="bottom">\n' + '            <p>Herderschule L\xFCneburg <span style="width:10px">&nbsp;<\/span> D-21339,Ochtmiss. Kirchsteig<br />\n' + '            Schuljahr 2017/2018<span style="width:10px">&nbsp;<\/span>&nbsp;Stand: 25.10.2017 11:50\n' + '        <\/td>\n' + '    <\/tr>\n' + '<\/table>\n' + '\n' + '<p>\n' + '<CENTER>\n' + '<font size="3" face="Arial">\n' + '<div class="mon_title">25.10.2017 Mittwoch<\/div>\n' + '<table class="info" >\n' + '<tr class="info"><th class="info" align="center" colspan="2">Nachrichten zum Tag<\/th><\/tr>\n' + "<tr class='info'><td class='info' colspan=\"2\">Klasse 9S1 schreibt am 01. November 2017 eine Politik- KLassenarbeit.<\/td><\/tr>\n" + "<tr class='info'><td class='info' colspan=\"2\">Nur noch diese Woche: Gewinn-Quiz zur Reformation im SLZ!<\/td><\/tr>\n" + "<tr class='info'><td class='info' colspan=\"2\">Heute finden f\xFCr den Jahrgang 12 Klausuren unter Abiturbedingungen statt. Bitte nehmt R\xFCcksicht und verhaltet euch in den G\xE4ngen leise! Der Unterricht f\xFCr den Jahrgang 12 endet nach der 6. Stunde.<\/td><\/tr>\n" + '<\/table>\n' + '<p>\n' + '<table class="mon_list" >\n' + '<tr class=\'list\'><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list" align="center">statt<\/th><th class="list" align="center">&nbsp;<\/th><th class="list" align="center">&nbsp;<\/th><\/tr>\n' + '<tr class=\'list\'><th class="list" align="center"><b>Stunde<\/b><\/th><th class="list" align="center" width=\'10\'><b>Klasse(n)<\/b><\/th><th class="list" align="center"><b>Vertreter<\/b><\/th><th class="list" align="center"><b>Fach<\/b><\/th><th class="list" align="center"><b>Raum<\/b><\/th><th class="list" align="center">(Lehrer)<\/th><th class="list" align="center">(Fach)<\/th><th class="list" align="center">(Raum)<\/th><th class="list" align="center" width=\'30\'>Vertretungs-Text<\/th><th class="list" align="center">Vertr. von<\/th><th class="list" align="center">Mitbetreuung<\/th><th class="list" align="center">Entfall<\/th><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1<\/b><\/td><td class="list" align="center"><b>5c<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Wh<\/td><td class="list" align="center">Ku<\/td><td class="list" align="center">223/KU<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>2<\/b><\/td><td class="list" align="center"><b>5c<\/b><\/td><td class="list" align="center"><b>Kg<\/b><\/td><td class="list" align="center"><b>De<\/b><\/td><td class="list" align="center"><b>A14<\/b><\/td><td class="list" align="center">Wh<\/td><td class="list" align="center">Ku<\/td><td class="list" align="center">223/KU<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1<\/b><\/td><td class="list" align="center"><b>6F1<\/b><\/td><td class="list" align="center"><b>Su<\/b><\/td><td class="list" align="center"><b>Ek<\/b><\/td><td class="list" align="center"><b>A01<\/b><\/td><td class="list" align="center">Su<\/td><td class="list" align="center">Ek<\/td><td class="list" align="center">A01<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3<\/b><\/td><td class="list" align="center"><b>6F1<\/b><\/td><td class="list" align="center"><b>My<\/b><\/td><td class="list" align="center"><b>Ku<\/b><\/td><td class="list" align="center"><b>A02<\/b><\/td><td class="list" align="center">Hh<\/td><td class="list" align="center">Ku<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3<\/b><\/td><td class="list" align="center"><b>6F1<\/b><\/td><td class="list" align="center"><b>My<\/b><\/td><td class="list" align="center"><b>Ku<\/b><\/td><td class="list" align="center"><b>A01<\/b><\/td><td class="list" align="center">Wh<\/td><td class="list" align="center">Ku<\/td><td class="list" align="center">U1/KU3<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>4<\/b><\/td><td class="list" align="center"><b>6F1<\/b><\/td><td class="list" align="center"><b>K\xFC<\/b><\/td><td class="list" align="center"><b>Fr<\/b><\/td><td class="list" align="center"><b>A01<\/b><\/td><td class="list" align="center">Wh<\/td><td class="list" align="center">Ku<\/td><td class="list" align="center">U1/KU3<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>4<\/b><\/td><td class="list" align="center"><b>6F1<\/b><\/td><td class="list" align="center"><b>K\xFC<\/b><\/td><td class="list" align="center"><b>Ku<\/b><\/td><td class="list" align="center"><b>A01<\/b><\/td><td class="list" align="center">Wh<\/td><td class="list" align="center">Ku<\/td><td class="list" align="center">U1/KU3<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>4<\/b><\/td><td class="list" align="center"><b>6F1<\/b><\/td><td class="list" align="center"><b>K\xFC<\/b><\/td><td class="list" align="center"><b>Ku<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Hh<\/td><td class="list" align="center">Ku<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>2<\/b><\/td><td class="list" align="center"><b>6L<\/b><\/td><td class="list" align="center"><b>Ts<\/b><\/td><td class="list" align="center"><b>En<\/b><\/td><td class="list" align="center"><b>127<\/b><\/td><td class="list" align="center">Su<\/td><td class="list" align="center">En<\/td><td class="list" align="center">127<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>6S1<\/b><\/td><td class="list" align="center"><b>Pt<\/b><\/td><td class="list" align="center"><b>Ch<\/b><\/td><td class="list" align="center"><b>209<\/b><\/td><td class="list" align="center">Pt<\/td><td class="list" align="center">Ch<\/td><td class="list" align="center">201/CH<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>7F1<\/b><\/td><td class="list" align="center"><b>Dh<\/b><\/td><td class="list" align="center"><b>Ek<\/b><\/td><td class="list" align="center"><b>116<\/b><\/td><td class="list" align="center">Dh<\/td><td class="list" align="center">Ek<\/td><td class="list" align="center">218/EK<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>7F2<\/b><\/td><td class="list" align="center"><b>Sb<\/b><\/td><td class="list" align="center"><b>Sp<\/b><\/td><td class="list" align="center"><b>TH1<\/b><\/td><td class="list" align="center">Ell<\/td><td class="list" align="center">Sp<\/td><td class="list" align="center">GrII<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3<\/b><\/td><td class="list" align="center"><b>7F2<\/b><\/td><td class="list" align="center"><b>Th<\/b><\/td><td class="list" align="center"><b>Fr<\/b><\/td><td class="list" align="center"><b>210<\/b><\/td><td class="list" align="center">Ell<\/td><td class="list" align="center">Fr<\/td><td class="list" align="center">210<\/td><td class="list" align="center">Sch\xFCler haben Aufgaben<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>7L<\/b><\/td><td class="list" align="center"><b>Sde<\/b><\/td><td class="list" align="center"><b>Ch<\/b><\/td><td class="list" align="center"><b>109/NW<\/b><\/td><td class="list" align="center">Sde<\/td><td class="list" align="center">Ch<\/td><td class="list" align="center">204/CH<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>8L<\/b><\/td><td class="list" align="center"><b>Sde<\/b><\/td><td class="list" align="center"><b>Ch<\/b><\/td><td class="list" align="center"><b>208/PH<\/b><\/td><td class="list" align="center">Sde<\/td><td class="list" align="center">Ch<\/td><td class="list" align="center">204/CH<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5<\/b><\/td><td class="list" align="center"><b>8L<\/b><\/td><td class="list" align="center"><b>Dt<\/b><\/td><td class="list" align="center"><b>Ma<\/b><\/td><td class="list" align="center"><b>127<\/b><\/td><td class="list" align="center">Ell<\/td><td class="list" align="center">Sp<\/td><td class="list" align="center">GrI<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>8L<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Ell<\/td><td class="list" align="center">Sp<\/td><td class="list" align="center">GrI<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5<\/b><\/td><td class="list" align="center"><b>8S2<\/b><\/td><td class="list" align="center"><b>Su<\/b><\/td><td class="list" align="center"><b>Sn<\/b><\/td><td class="list" align="center"><b>103<\/b><\/td><td class="list" align="center">Hi<\/td><td class="list" align="center">Sn<\/td><td class="list" align="center">103<\/td><td class="list" align="center">Die Sch\xFCler arbeiten in<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Kleingruppen<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>8S2<\/b><\/td><td class="list" align="center"><b>Hes<\/b><\/td><td class="list" align="center"><b>En<\/b><\/td><td class="list" align="center"><b>103<\/b><\/td><td class="list" align="center">Hi<\/td><td class="list" align="center">Sn<\/td><td class="list" align="center">103<\/td><td class="list" align="center">Die Sch\xFCler arbeiten in<\/td><td class="list" align="center">Mi-25.10. / 7<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Kleingruppen<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>7<\/b><\/td><td class="list" align="center"><b>8S2<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Hes<\/td><td class="list" align="center">En<\/td><td class="list" align="center">103<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3<\/b><\/td><td class="list" align="center"><b>9FL, 9F, 9L, 9S2<\/b><\/td><td class="list" align="center"><b>Hes<\/b><\/td><td class="list" align="center"><b>Phw<\/b><\/td><td class="list" align="center"><b>K111<\/b><\/td><td class="list" align="center">Wm<\/td><td class="list" align="center">Phw<\/td><td class="list" align="center">KRNW<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>9FL, 9F, 9L, 9S2<\/b><\/td><td class="list" align="center"><b>To<\/b><\/td><td class="list" align="center"><b>DSw<\/b><\/td><td class="list" align="center"><b>K110<\/b><\/td><td class="list" align="center">Hi<\/td><td class="list" align="center">DSw<\/td><td class="list" align="center">Aula<\/td><td class="list" align="center">Sch\xFCler arbeiten wie<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">abgesprochen in Kleingruppen<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>4<\/b><\/td><td class="list" align="center"><b>9FL, 9F, 9L, 9S2<\/b><\/td><td class="list" align="center"><b>To<\/b><\/td><td class="list" align="center"><b>Phw<\/b><\/td><td class="list" align="center"><b>K110<\/b><\/td><td class="list" align="center">Wm<\/td><td class="list" align="center">Phw<\/td><td class="list" align="center">KRNW<\/td><td class="list" align="center">Lekt\xFCre<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1<\/b><\/td><td class="list" align="center"><b>9L<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Wn<\/td><td class="list" align="center">La<\/td><td class="list" align="center">K110<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5<\/b><\/td><td class="list" align="center"><b>9L<\/b><\/td><td class="list" align="center"><b>Ed<\/b><\/td><td class="list" align="center"><b>Ge<\/b><\/td><td class="list" align="center"><b>K110<\/b><\/td><td class="list" align="center">Wn<\/td><td class="list" align="center">Ge<\/td><td class="list" align="center">K110<\/td><td class="list" align="center">Sch\xFCler schauen Film<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>9L<\/b><\/td><td class="list" align="center"><b>Hd<\/b><\/td><td class="list" align="center"><b>Ge<\/b><\/td><td class="list" align="center"><b>K110<\/b><\/td><td class="list" align="center">Wn<\/td><td class="list" align="center">Ge<\/td><td class="list" align="center">K110<\/td><td class="list" align="center">Unterricht findet statt,<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Sch\xFCler schauen Film<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>7 - 8<\/b><\/td><td class="list" align="center"><b>9L<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Of<\/td><td class="list" align="center">KrBi<\/td><td class="list" align="center">106/BI2<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>(9S1)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Ed<\/td><td class="list" align="center">PW<\/td><td class="list" align="center">K111<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5<\/b><\/td><td class="list" align="center"><b>9S2<\/b><\/td><td class="list" align="center"><b>Ed<\/b><\/td><td class="list" align="center"><b>KrBi<\/b><\/td><td class="list" align="center"><b>K111<\/b><\/td><td class="list" align="center">Of<\/td><td class="list" align="center">KrBi<\/td><td class="list" align="center">109/NW<\/td><td class="list" align="center">Lekt\xFCre<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>9S2<\/b><\/td><td class="list" align="center"><b>Ma<\/b><\/td><td class="list" align="center"><b>KrBi<\/b><\/td><td class="list" align="center"><b>K111<\/b><\/td><td class="list" align="center">Of<\/td><td class="list" align="center">KrBi<\/td><td class="list" align="center">109/NW<\/td><td class="list" align="center">Lekt\xFCre<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>10F2<\/b><\/td><td class="list" align="center"><b>Sr<\/b><\/td><td class="list" align="center"><b>Bi<\/b><\/td><td class="list" align="center"><b>09<\/b><\/td><td class="list" align="center">Sr<\/td><td class="list" align="center">Bi<\/td><td class="list" align="center">106/BI2<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>7<\/b><\/td><td class="list" align="center"><b>10F2<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Ho<\/td><td class="list" align="center">Mu<\/td><td class="list" align="center">U3/MU2<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>8<\/b><\/td><td class="list" align="center"><b>10F2<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Ho<\/td><td class="list" align="center">Mu<\/td><td class="list" align="center">U3/MU2<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>11. Jg.<\/b><\/td><td class="list" align="center"><b>Pt<\/b><\/td><td class="list" align="center"><b>ch1<\/b><\/td><td class="list" align="center"><b>109/NW<\/b><\/td><td class="list" align="center">Pt<\/td><td class="list" align="center">ch1<\/td><td class="list" align="center">201/CH<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>11. Jg.<\/b><\/td><td class="list" align="center"><b>+<\/b><\/td><td class="list" align="center"><b>in2<\/b><\/td><td class="list" align="center"><b>Comp<\/b><\/td><td class="list" align="center">Ba<\/td><td class="list" align="center">in2<\/td><td class="list" align="center">Comp<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>11. Jg.<\/b><\/td><td class="list" align="center"><b>+<\/b><\/td><td class="list" align="center"><b>ge1<\/b><\/td><td class="list" align="center"><b>120<\/b><\/td><td class="list" align="center">Wn<\/td><td class="list" align="center">ge1<\/td><td class="list" align="center">120<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>11. Jg.<\/b><\/td><td class="list" align="center"><b>Ku<\/b><\/td><td class="list" align="center"><b>ek1<\/b><\/td><td class="list" align="center"><b>213<\/b><\/td><td class="list" align="center">Ku<\/td><td class="list" align="center">ek1<\/td><td class="list" align="center">01<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>11. Jg.<\/b><\/td><td class="list" align="center"><b>Bn<\/b><\/td><td class="list" align="center"><b>ge2<\/b><\/td><td class="list" align="center"><b>124<\/b><\/td><td class="list" align="center">Bn<\/td><td class="list" align="center">ge2<\/td><td class="list" align="center">101/PW<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Sr<\/td><td class="list" align="center">BI1<\/td><td class="list" align="center">104/BI1<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Sv<\/td><td class="list" align="center">BI2<\/td><td class="list" align="center">106/BI2<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Ec<\/td><td class="list" align="center">CH1<\/td><td class="list" align="center">204/CH<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Go<\/td><td class="list" align="center">EK1<\/td><td class="list" align="center">218/EK<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Pg<\/td><td class="list" align="center">EK2<\/td><td class="list" align="center">01<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Mt<\/td><td class="list" align="center">PW1<\/td><td class="list" align="center">101/PW<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Bm<\/td><td class="list" align="center">CH2<\/td><td class="list" align="center">201/CH<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Ma<\/td><td class="list" align="center">de3<\/td><td class="list" align="center">121<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Ar<\/td><td class="list" align="center">ek1<\/td><td class="list" align="center">218/EK<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Kn<\/td><td class="list" align="center">en3<\/td><td class="list" align="center">04<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Kr<\/td><td class="list" align="center">ge1<\/td><td class="list" align="center">101/PW<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Hd<\/td><td class="list" align="center">ma2<\/td><td class="list" align="center">09<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Sn<\/td><td class="list" align="center">ph1<\/td><td class="list" align="center">208/PH<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Dc<\/td><td class="list" align="center">bi1<\/td><td class="list" align="center">104/BI1<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Kh<\/td><td class="list" align="center">pw1<\/td><td class="list" align="center">09<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">HR<\/td><td class="list" align="center">de1<\/td><td class="list" align="center">213<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">K\xFC<\/td><td class="list" align="center">ge2<\/td><td class="list" align="center">04<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Co<\/td><td class="list" align="center">ma1<\/td><td class="list" align="center">209<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Hs<\/td><td class="list" align="center">re1<\/td><td class="list" align="center">03<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Kg<\/td><td class="list" align="center">ge21<\/td><td class="list" align="center">220<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>7 - 8<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Bn<\/td><td class="list" align="center">wn4<\/td><td class="list" align="center">101/PW<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>7 - 8<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Sw<\/td><td class="list" align="center">ku21<\/td><td class="list" align="center">223/KU<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>7 - 8<\/b><\/td><td class="list" align="center"><b>(12. Jg.)<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Li<\/td><td class="list" align="center">re22<\/td><td class="list" align="center">04<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>7 - 8<\/b><\/td><td class="list" align="center"><b>AG<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Wm<\/td><td class="list" align="center">AG<\/td><td class="list" align="center">Comp<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>K1<\/b><\/td><td class="list" align="center"><b>Ec<\/b><\/td><td class="list" align="center"><b>Ch<\/b><\/td><td class="list" align="center"><b>204/CH<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>K1<\/b><\/td><td class="list" align="center"><b>Ma<\/b><\/td><td class="list" align="center"><b>Ch<\/b><\/td><td class="list" align="center"><b>204/CH<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>K1<\/b><\/td><td class="list" align="center"><b>Dc<\/b><\/td><td class="list" align="center"><b>Ch<\/b><\/td><td class="list" align="center"><b>204/CH<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>K2<\/b><\/td><td class="list" align="center"><b>Bm<\/b><\/td><td class="list" align="center"><b>Ch<\/b><\/td><td class="list" align="center"><b>201/CH<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>K2<\/b><\/td><td class="list" align="center"><b>Ar<\/b><\/td><td class="list" align="center"><b>Ch<\/b><\/td><td class="list" align="center"><b>201/CH<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>K2<\/b><\/td><td class="list" align="center"><b>Kh<\/b><\/td><td class="list" align="center"><b>Ch<\/b><\/td><td class="list" align="center"><b>201/CH<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>K3<\/b><\/td><td class="list" align="center"><b>Sr<\/b><\/td><td class="list" align="center"><b>Bi<\/b><\/td><td class="list" align="center"><b>104/BI1<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>K3<\/b><\/td><td class="list" align="center"><b>Kn<\/b><\/td><td class="list" align="center"><b>Bi<\/b><\/td><td class="list" align="center"><b>104/BI1<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>K3<\/b><\/td><td class="list" align="center"><b>HR<\/b><\/td><td class="list" align="center"><b>Bi<\/b><\/td><td class="list" align="center"><b>104/BI1<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>K4<\/b><\/td><td class="list" align="center"><b>Sv<\/b><\/td><td class="list" align="center"><b>Bi<\/b><\/td><td class="list" align="center"><b>106/BI2<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>K4<\/b><\/td><td class="list" align="center"><b>Kr<\/b><\/td><td class="list" align="center"><b>Bi<\/b><\/td><td class="list" align="center"><b>106/BI2<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>K4<\/b><\/td><td class="list" align="center"><b>K\xFC<\/b><\/td><td class="list" align="center"><b>Bi<\/b><\/td><td class="list" align="center"><b>106/BI2<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>K5<\/b><\/td><td class="list" align="center"><b>Go<\/b><\/td><td class="list" align="center"><b>Ek<\/b><\/td><td class="list" align="center"><b>01<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>K5<\/b><\/td><td class="list" align="center"><b>Hd<\/b><\/td><td class="list" align="center"><b>Ek<\/b><\/td><td class="list" align="center"><b>01<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>K5<\/b><\/td><td class="list" align="center"><b>Co<\/b><\/td><td class="list" align="center"><b>Ek<\/b><\/td><td class="list" align="center"><b>01<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>K6<\/b><\/td><td class="list" align="center"><b>Pg<\/b><\/td><td class="list" align="center"><b>Ek<\/b><\/td><td class="list" align="center"><b>218/EK<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>3 - 4<\/b><\/td><td class="list" align="center"><b>K6<\/b><\/td><td class="list" align="center"><b>Sn<\/b><\/td><td class="list" align="center"><b>Ek<\/b><\/td><td class="list" align="center"><b>218/EK<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>K6<\/b><\/td><td class="list" align="center"><b>Hs<\/b><\/td><td class="list" align="center"><b>Ek<\/b><\/td><td class="list" align="center"><b>218/EK<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1 - 2<\/b><\/td><td class="list" align="center"><b>K7<\/b><\/td><td class="list" align="center"><b>Mt<\/b><\/td><td class="list" align="center"><b>PW<\/b><\/td><td class="list" align="center"><b>101/PW<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>3<\/b><\/td><td class="list" align="center"><b>K7<\/b><\/td><td class="list" align="center"><b>Sb<\/b><\/td><td class="list" align="center"><b>PW<\/b><\/td><td class="list" align="center"><b>101/PW<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>4<\/b><\/td><td class="list" align="center"><b>K7<\/b><\/td><td class="list" align="center"><b>Wa<\/b><\/td><td class="list" align="center"><b>PW<\/b><\/td><td class="list" align="center"><b>101/PW<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>K7<\/b><\/td><td class="list" align="center"><b>Kg<\/b><\/td><td class="list" align="center"><b>PW<\/b><\/td><td class="list" align="center"><b>101/PW<\/b><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">Klausuraufsicht<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<\/table>\n' + '<p>\n' + '<font size="3" face="Arial">\n' + 'Periode5   25.10.2017   Gymnasium Herderschule L\xFCneburg   DB~66680~2017-2018~1\n' + '<\/font><\/font>\n' + '\n' + '<\/CENTER>\n' + '<p>&nbsp;<p>&nbsp;<p>\n' + '<CENTER>\n' + '<font size="3" face="Arial">\n' + '<div class="mon_title">26.10.2017 Donnerstag<\/div>\n' + '<table class="info" >\n' + '<tr class="info"><th class="info" align="center" colspan="2">Nachrichten zum Tag<\/th><\/tr>\n' + "<tr class='info'><td class='info' colspan=\"2\">Nur noch diese Woche: Gewinn-Quiz zur Reformation im SLZ!<\/td><\/tr>\n" + '<\/table>\n' + '<p>\n' + '<table class="mon_list" >\n' + '<tr class=\'list\'><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list">&nbsp;<\/th><th class="list" align="center">statt<\/th><th class="list" align="center">&nbsp;<\/th><th class="list" align="center">&nbsp;<\/th><\/tr>\n' + '<tr class=\'list\'><th class="list" align="center"><b>Stunde<\/b><\/th><th class="list" align="center" width=\'10\'><b>Klasse(n)<\/b><\/th><th class="list" align="center"><b>Vertreter<\/b><\/th><th class="list" align="center"><b>Fach<\/b><\/th><th class="list" align="center"><b>Raum<\/b><\/th><th class="list" align="center">(Lehrer)<\/th><th class="list" align="center">(Fach)<\/th><th class="list" align="center">(Raum)<\/th><th class="list" align="center" width=\'30\'>Vertretungs-Text<\/th><th class="list" align="center">Vertr. von<\/th><th class="list" align="center">Mitbetreuung<\/th><th class="list" align="center">Entfall<\/th><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">2<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">5a<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Si<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">En<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">A02<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Ar<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">En<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">A02<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>5a<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Md<\/td><td class="list" align="center">Ph<\/td><td class="list" align="center">205/PH<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">5<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">6F1, 6F2, 6L, 6S1, 6S2<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Th<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">WN<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">126<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Wz<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">WN<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">126<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>6F1, 6F2, 6L, 6S1, 6S2<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Kn<\/td><td class="list" align="center">WN<\/td><td class="list" align="center">A12<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">5<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">7F2<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">K\xFC<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Ek<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">210<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Go<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ek<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">210<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>7F2<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Go<\/td><td class="list" align="center">Ek<\/td><td class="list" align="center">210<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">7 - 8<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">7L<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Pa<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Ge<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">209<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Pa<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ge<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">209<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>8F/L<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Th<\/td><td class="list" align="center">Fr<\/td><td class="list" align="center">127<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">6<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">8F/L<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Kw<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">La<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">115<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Kw<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">La<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">122<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">5<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">8F1<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Bi<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Fr<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">125<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Mh<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Fr<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">115<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>8F1<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Kh<\/td><td class="list" align="center">En<\/td><td class="list" align="center">115<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>8F2<\/b><\/td><td class="list" align="center"><b>Mh<\/b><\/td><td class="list" align="center"><b>Ek<\/b><\/td><td class="list" align="center"><b>124<\/b><\/td><td class="list" align="center">Dh<\/td><td class="list" align="center">Ek<\/td><td class="list" align="center">124<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">3<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">8L, 8F1, 8F2, 8S1, 8S2<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">St<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Biw<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">106/BI2<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Of<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Biw<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">106/BI2<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">4<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">8L, 8F1, 8F2, 8S1, 8S2<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Pt<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Biw<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">106/BI2<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Of<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Biw<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">106/BI2<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>8L<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Sde<\/td><td class="list" align="center">Ek<\/td><td class="list" align="center">112<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">5<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">8S1<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Fl<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">En<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">204/CH<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Of<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ch<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">204/CH<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>8S1<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Of<\/td><td class="list" align="center">Ch<\/td><td class="list" align="center">204/CH<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">5<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">8S2<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Hu<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Ma<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">127<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Hu<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ma<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">103<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">6<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">8S2<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Wz<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Ma<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">127<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Hu<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ma<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">103<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Die Sch\xFCler arbeiten in<\/span><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">x<\/span><\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">Kleingruppen an den Spanisch-<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">Aufgaben<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">5<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">9F<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Mt<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">PW<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">K108<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Ts<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">PW<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">K108<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Aufgaben l\xF6sen<\/span><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">x<\/span><\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>1<\/b><\/td><td class="list" align="center"><b>9FL<\/b><\/td><td class="list" align="center"><b>Bm<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Bm<\/td><td class="list" align="center">KrMu<\/td><td class="list" align="center">KrKu<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">3<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">9FL<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Bm<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">KrMu<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">KrKu<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Hh<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">Do-26.10. / 1<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">3<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">9FL<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Bm<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Ku<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">KrMu<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Wh<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ku<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">x<\/span><\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">4<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">9FL<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Kh<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">En<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">K113<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Hh<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">Do-26.10. / 7<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">4<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">9FL<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Kh<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">En<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">K113<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Wh<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ku<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>9FL<\/b><\/td><td class="list" align="center"><b>Sh<\/b><\/td><td class="list" align="center"><b>PW<\/b><\/td><td class="list" align="center"><b>K113<\/b><\/td><td class="list" align="center">Mt<\/td><td class="list" align="center">PW<\/td><td class="list" align="center">K113<\/td><td class="list" align="center">Aufgaben l\xF6sen<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">7<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">9FL<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">---<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">---<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">---<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Kh<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">En<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">K113<\/span><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">x<\/span><\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">5<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">9S1<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Bc<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">KrKu<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">KrKu<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Hh<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">x<\/span><\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">5<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">9S1<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Bc<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Ku<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">KrKu<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Wh<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ku<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>9S1<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Hh<\/td><td class="list" align="center">KrKu<\/td><td class="list" align="center">KrKu<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">6<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">9S1<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">---<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">---<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">---<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Wh<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ku<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">KrKu<\/span><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">x<\/span><\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>10F2<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">K\xFC<\/td><td class="list" align="center">Fr<\/td><td class="list" align="center">213<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>10L<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Ka<\/td><td class="list" align="center">Ma<\/td><td class="list" align="center">214<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">5<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">10S1<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Ec<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Ch<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">201/CH<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">St<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Ch<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">201/CH<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>10S1<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">St<\/td><td class="list" align="center">Ch<\/td><td class="list" align="center">201/CH<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>5 - 6<\/b><\/td><td class="list" align="center"><b>11. Jg.<\/b><\/td><td class="list" align="center"><b>+<\/b><\/td><td class="list" align="center"><b>sf4<\/b><\/td><td class="list" align="center"><b>218/EK<\/b><\/td><td class="list" align="center">Pg<\/td><td class="list" align="center">sf4<\/td><td class="list" align="center">218/EK<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>11. Jg.<\/b><\/td><td class="list" align="center"><b>Mm<\/b><\/td><td class="list" align="center"><b>sp6<\/b><\/td><td class="list" align="center"><b>TH1<\/b><\/td><td class="list" align="center">Mm<\/td><td class="list" align="center">sp6<\/td><td class="list" align="center">TH1<\/td><td class="list" align="center">findet statt!<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>11. Jg.<\/b><\/td><td class="list" align="center"><b>+<\/b><\/td><td class="list" align="center"><b>sf2<\/b><\/td><td class="list" align="center"><b>09<\/b><\/td><td class="list" align="center">Wn<\/td><td class="list" align="center">sf2<\/td><td class="list" align="center">09<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>11. Jg.<\/b><\/td><td class="list" align="center"><b>+<\/b><\/td><td class="list" align="center"><b>sp7<\/b><\/td><td class="list" align="center"><b>Gy<\/b><\/td><td class="list" align="center">Ell<\/td><td class="list" align="center">sp7<\/td><td class="list" align="center">Gy<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b><span style="color: #FF0000">7 - 8<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">11. Jg.<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">---<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">---<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">---<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Go<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">sf6<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">09<\/span><\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">x<\/span><\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">3 - 4<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">12. Jg.<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">+<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">ds1<\/span><\/b><\/td><td class="list" align="center"><b><span style="color: #FF0000">Aula<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Go<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">ds1<\/span><\/td><td class="list" align="center"><span style="color: #FF0000">Aula<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>12. Jg.<\/b><\/td><td class="list" align="center"><b>+<\/b><\/td><td class="list" align="center"><b>EN2<\/b><\/td><td class="list" align="center"><b>03<\/b><\/td><td class="list" align="center">Bu<\/td><td class="list" align="center">EN2<\/td><td class="list" align="center">03<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>12. Jg.<\/b><\/td><td class="list" align="center"><b>+<\/b><\/td><td class="list" align="center"><b>KU1<\/b><\/td><td class="list" align="center"><b>223/KU<\/b><\/td><td class="list" align="center">KB<\/td><td class="list" align="center">KU1<\/td><td class="list" align="center">223/KU<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>12. Jg.<\/b><\/td><td class="list" align="center"><b>+<\/b><\/td><td class="list" align="center"><b>GE2<\/b><\/td><td class="list" align="center"><b>04<\/b><\/td><td class="list" align="center">Wa<\/td><td class="list" align="center">GE2<\/td><td class="list" align="center">04<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b>6<\/b><\/td><td class="list" align="center"><b>12. Jg.<\/b><\/td><td class="list" align="center"><b>+<\/b><\/td><td class="list" align="center"><b>KU2<\/b><\/td><td class="list" align="center"><b>225/KU<\/b><\/td><td class="list" align="center">Sw<\/td><td class="list" align="center">KU2<\/td><td class="list" align="center">225/KU<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<tr class=\'list even\'><td class="list" align="center"><b>2<\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center"><b>---<\/b><\/td><td class="list" align="center">Of<\/td><td class="list" align="center">SL<\/td><td class="list" align="center">Szi<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list">&nbsp;<\/td><td class="list" align="center">x<\/td><\/tr>\n' + '<tr class=\'list odd\'><td class="list" align="center"><b><span style="color: #FF0000">4/5<\/span><\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b><span style="color: #FF0000">Sh<\/span><\/b><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><b><span style="color: #FF0000">PHK<\/span><\/b><\/td><td class="list" align="center"><span style="color: #FF0000">Hh<\/span><\/td><td class="list">&nbsp;<\/td><td class="list" align="center"><span style="color: #FF0000">PHK<\/span><\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><td class="list" align="center">&nbsp;<\/td><\/tr>\n' + '<\/table>\n' + '<p>\n' + '<font size="3" face="Arial">\n' + 'Periode5   26.10.2017   Gymnasium Herderschule L\xFCneburg   DB~66680~2017-2018~1\n' + '<\/font><\/font>\n' + '\n' + '<\/CENTER>\n' + '<p>&nbsp;<p>\n' + '<p><center><font face="Arial" size="2"><a href="http://www.untis.at" target="_blank" >Untis Stundenplan Software<\/a><\/font><\/center>\n' + '<!-- and Stefan Bartels -->\n' + '<\/body>\n' + '<\/html>';
  main([]);
  Kotlin.defineModule('VertretungsplanApp3', _);
  return _;
}(typeof VertretungsplanApp3 === 'undefined' ? {} : VertretungsplanApp3, kotlin);
