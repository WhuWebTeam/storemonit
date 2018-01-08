'use strict';

window.onload = function () {
	function getList() {
		var tbody = document.getElementsByTagName('tbody')[0];
		tbody.innerHTML = '';
		$.ajax({
			url: '/api/v1/areas/info/areas',
			type: 'get',
			success: function success(results) {
				var data = results.data;

				var _loop = function _loop(i) {
					tr = document.createElement('tr');

					tr.innerHTML = '\n\t\t\t\t\t\t<td><input type="checkbox" value="' + data[i].id + '"></td>\n\t\t\t\t\t\t<td>' + data[i].id + '</td>\n\t\t\t\t\t\t<td>' + data[i].name + '</td>\n\t\t\t\t\t\t<td>' + data[i].details + '</td>\n\t\t\t\t\t\t<td><button class="btn btn-info btn-sm">\u7F16\u8F91</button></td>\n\t\t\t\t\t';
					tbody.appendChild(tr);

					edit = tr.getElementsByTagName('button')[0];

					edit.onclick = function () {
						$('#handleRecord p').html('编辑区域');
						$('#id').val(data[i].id);
						$('#name').val(data[i].name);
						$('#details').val(data[i].details);
						$('#operation').val('edit');
						$('#handleRecord')[0].style.display = 'block';
						$('#id').attr('disabled', '');
						watchForm();
					};
				};

				for (var i = 0; i < data.length; i++) {
					var tr;
					var edit;

					_loop(i);
				}
			}
		});
	} /* show list */

	$('#add').click(function () {
		$('#handleRecord p').html('新增区域');
		$('#id').val('');
		$('#name').val('');
		$('#details').val('');
		$('#operation').val('add');
		$('#handleRecord')[0].style.display = 'block';
		$('#id').removeAttr('disabled');
		watchForm();
	});

	$('#delete').click(function () {
		var areas = [];
		$(':checked').each(function () {
			areas.push({
				'id': this.value
			});
		});
		$.ajax({
			url: '/api/v1/areas',
			type: 'delete',
			data: { areas: areas },
			success: function success() {
				getList();
			}
		});
	});

	$('#submit').click(function () {
		if ($('#operation').val() == 'add') {
			$.ajax({
				url: '/api/v1/areas/info/' + $('#id').val(),
				type: 'POST',
				data: {
					'name': $('#name').val(),
					'details': $('#details').val()
				},
				success: function success(results) {
					if (results.code == 403) {
						alert('您输入的id号已存在,新增记录失败！');
					}
					$('#handleRecord')[0].style.display = 'none';
					getList();
				}
			});
		}
		if ($('#operation').val() == 'edit') {
			$.ajax({
				url: '/api/v1/areas/info/' + $('#id').val(),
				type: 'put',
				data: {
					'name': $('#name').val(),
					'details': $('#details').val()
				},
				success: function success() {
					$('#handleRecord')[0].style.display = 'none';
					getList();
				}
			});
		}
	});
	$('#back').click(function () {
		$('#handleRecord')[0].style.display = 'none';
	});

	function watchForm() {
		if ($('#operation').val() == 'edit') {
			$("#id").css('border', '1px solid #ccc');
			$("#name").css('border', '1px solid #ccc');
			$("#details").css('border', '1px solid #ccc');
			$('#submit').removeAttr('disabled');
		} else {
			$("#id").css('border', '1px solid red');
			$("#name").css('border', '1px solid red');
			$("#details").css('border', '1px solid red');
			$('#submit').attr('disabled', '');
		}
	}

	$("#id").change(function () {
		this.style.border = $('#id').val() ? '1px solid #ccc' : '1px solid red';
	});
	$("#name").change(function () {
		this.style.border = $('#name').val() ? '1px solid #ccc' : '1px solid red';
	});
	$("#details").change(function () {
		this.style.border = $('#details').val() ? '1px solid #ccc' : '1px solid red';
	});
	$(":input").bind('input propertychange', function () {
		var id = $('#id').val();
		var name = $('#name').val();
		var details = $('#details').val();

		if (details && name && id) {
			$('#submit').removeAttr('disabled');
		} else {
			$('#submit').attr('disabled', '');
		}
	});

	getList();
};