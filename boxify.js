(function($) {
$.fn.boxify = function($o) {
	var _o = $.extend({
		fg: '#eeeeee',
		bg: '#444444',
		hbg: '#cccccc',
		lbg: '#dddddd',
		size: '.9em',
		margin: '15px 0',
		padding: 5,
		fontSize: '1em',
		styled: true
	}, $o);

	return this.filter('input,textarea').each(function() {
		var _tb = $(this), _ib3, _label, _width = 0;

		if (_tb.data('installed')) {
			return true;
		}

		_tb.css({
			outline: 0,
			margin: 0,
			border: 0,
			backgroundColor: 'transparent',
			position: 'relative',
			resize: 'none',
			zIndex: 2
		})
		.attr({autocomplete: 'off', spellcheck: 'false'})
		.data('installed', true)
		.wrap('<div class="boxify" \/>');

		_ib3 = _tb.closest('.boxify')
			.css({
				zoom: 1,
				margin: _o.margin,
				position: 'relative',
				backgroundColor: _o.hbg,
				width: _o.width || $(this).width()
			});

		_label = $('<div class="boxify-label">' +
			($(this).attr('title') || '') +
		'<\/div>')
			.click(function() { _tb.focus(); })
			.prependTo(_ib3);

		if (_o.styled) {
			_tb.addClass('boxify-input').css({padding: _o.padding});
			_label.css({padding: _o.padding});
		} else {
			_ib3.css({padding: _o.padding, borderRadius: 2});
		}

		_width = _ib3.innerWidth();

		if (_o.label) {
			_ib3.css({
				backgroundColor: 'transparent',
				borderRadius: 0,
				padding: 0
			});

			_label.removeClass('boxify-label')
			.addClass('boxify-label-alt')
			.css({
				fontSize: _o.size,
				marginBottom: 2,
				padding: 0
			});

			_tb
			.addClass('boxify-input-alt')
			.css({
				color: _o.fg,
				backgroundColor: _o.bg,
				borderRadius: 2,
				padding: _o.padding,
				width: _width
			});
		} else {
			_tb.css({
				width: _width,
				fontSize: _o.fontSize
			});

			_label.css({
				width: _width,
				fontSize: _o.fontSize,
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				position: 'absolute',
				backgroundColor:
					$.support.opacity ? 'transparent' : _o.hbg,
				zIndex: 1,
				'-webkit-transition': 'opacity 0.15s linear',
				opacity: 0.6
			});

			_tb.bind('focus blur', function($e) {
				if ($e.type === 'focus') {
					_ib3.css({backgroundColor: _o.lbg});
					_label.css({backgroundColor:
						$.support.opacity ? 'transparent' : _o.lbg});
				} else {
					_ib3.css({backgroundColor: _o.hbg});
					_label.css({backgroundColor:
						$.support.opacity ? 'transparent' : _o.hbg});
				}
				_tb.prev().css({opacity: _tb.val() ? 0 : 0.6});
			})

			.bind('keypress keyup keydown', function($e) {
				if (_tb.val()) {
					_tb.prev().css({
						opacity: 0,
						'-webkit-transition-duration': '0s'
					});
				}
			});

			if (_tb.val().length > 0) {
				_tb.trigger('keyup');
			}
		}

		if (_tb.outerWidth() > _width) {
			var _off = _tb.outerWidth() - _width;
			_tb.width(_width - _off);
			_label.width(_width - _off);
		}

		return true;
	});
};
})(jQuery);
