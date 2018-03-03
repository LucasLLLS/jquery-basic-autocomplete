(function( $ ){

	$.fn.autocomplete = function(json){

		var optionsWrapperEl = document.querySelector('.autocomplete-wrapper .autocomplete-options-wrapper');
		var autocompleteWrapperEl = document.querySelector('.autocomplete-wrapper');

		var autocompleteInput = $(this);
		autocompleteInput.addClass('autocomplete-input');

		if(optionsWrapperEl){
			optionsWrapperEl.remove();
		}

		var optionsWrapper = document.createElement('ul');
		optionsWrapper.classList.add('autocomplete-options-wrapper');

		optionsWrapper.style.display = 'block';

		for(var i = 0; i < json.length; i++){

			var option = document.createElement('li');

			if(typeof json[i].thumb !== 'undefined'){
				var thumb = document.createElement('img');
				thumb.src = json[i].thumb;
				option.appendChild(thumb);
			}

			if(typeof json[i].name !== 'undefined'){
				var txt = document.createTextNode(json[i].name);
				option.appendChild(txt);
			}

			
			option.addEventListener('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				autocompleteInput.val(this.innerText);
			});

			document.addEventListener('click', function(e){
				optionsWrapper.style.display = 'none';
			});

			optionsWrapper.appendChild(option);	 
		}

		autocompleteWrapperEl.appendChild(optionsWrapper);
	}

	$.fn.autocompleteRequest = function(options) {

		var autocompleteInput = $(this);

		if(typeof options === 'undefined'){
			console.error('Não foram passados argumentos para a função');
		}
		else if(typeof options === 'object'){
			console.log($(this));

			$.ajax({
				url : options.url,
				dataType : 'json',
				type : options.method,
				success : function(data){
					autocompleteInput.autocomplete(data);
				},
				error : function(status){
					console.error(status);
				}
			});
		}

		else if(typeof options === 'string'){

			$.ajax({
				url : options,
				dataType : 'json',
				type : 'GET',
				success : function(data){
					autocompleteInput.autocomplete(data);
				},
				error : function(status){
					console.error(status);
				}
			});

		}

		else{
			console.error('Necessário passar parâmetro como objeto de opções ou string');
		}

		return this;
	}; 
})( jQuery );