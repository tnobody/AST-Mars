var RESULTS = {
    OVERLAP: 'OVERLAP',
    DISJOINT: 'DISJOINT',
    NESTED: 'NESTED',
    TOUCH: 'TOUCH',
    ERROR: 'ERROR'
}

function ERROR(msg) {
    console.error(msg, arguments)
    throw new Error(RESULTS.ERROR);
}

function MarsTime(h, m) {
    if (h < 0 || h >= 25 || m < 0 || m >= 100) {
        ERROR('Either hour or m are invalid', h, m)
    }
    this.minutes = m;
    this.hours = h;
}

MarsTime.prototype.getTime = function () {
    return (this.hours * 100) + this.minutes;
}

MarsTime.prototype.isBetween = function (interval) {
    return (
        this.getTime() > interval.from.getTime() &&
        this.getTime() < interval.to.getTime()
    )
}

MarsTime.prototype.toString = function () {
    return this.hours + ':' + this.minutes;
}

function MarsInterval(from, to) {
    if (from.constructor.name === MarsTime.name && to.constructor.name === MarsTime.name) {
        if (from.getTime() <= to.getTime()) {
            this.from = from;
            this.to = to;
        } else {
            ERROR("From should be smaller than to", from, to);
        }
    }
}

MarsInterval.prototype.isBetween = function (interval) {
    return (
        this.from.getTime() >= interval.from.getTime() &&
        this.to.getTime() <= interval.to.getTime()
    )
}

MarsInterval.prototype.overlaps = function (interval) {
    return (
        (this.from.isBetween(interval) && !this.to.isBetween(interval)) ||
        (!this.from.isBetween(interval) && this.to.isBetween(interval))
    )
}

MarsInterval.prototype.isTouching = function (interval) {
    return (
        this.from.getTime() === interval.from.getTime() ||
        this.from.getTime() === interval.to.getTime() ||
        this.to.getTime() === interval.from.getTime() ||
        this.to.getTime() === interval.to.getTime()
    )
}

MarsInterval.prototype.toString = function () {
    return this.from + ' - ' + this.to;
}

var calculate = function (i1fh, i1fm, i1th, i1tm, i2fh, i2fm, i2th, i2tm) {
    var i1f = new MarsTime(i1fh, i1fm);
    var i1t = new MarsTime(i1th, i1tm);
    var i2f = new MarsTime(i2fh, i2fm);
    var i2t = new MarsTime(i2th, i2tm);

    var interval1 = new MarsInterval(i1f, i1t)
    var interval2 = new MarsInterval(i2f, i2t)

    if (interval1.isBetween(interval2) || interval2.isBetween(interval1)) {
        return RESULTS.NESTED
    }

    if (interval1.isTouching(interval2)) {
        return RESULTS.TOUCH
    }

    if (interval1.overlaps(interval2) || interval2.overlaps(interval1)) {
        return RESULTS.OVERLAP
    }

    return RESULTS.DISJOINT;
}

exports.calculate = calculate;
exports.RESULTS = RESULTS;