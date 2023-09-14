let score = 0;
function getSadOrFedOrLeavingInterval() {
	return Date.now() + 1000;
}

function goneInterval() {
	return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
	return Date.now() + Math.floor(Math.random(3000)) + 2000;
}

function getKingStatus() {
	return Math.random() > 0.9;
}

const moles = [
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-0') },
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-1') },
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-2') },
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-3') },
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-4') },
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-5') },
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-6') },
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-7') },
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-8') },
	{ status: 'sad', next: getSadOrFedOrLeavingInterval(), king: false, node: document.querySelector('#hole-9') },
];

function getNextStatus(mole) {
	switch (mole.status) {
		case 'sad':
		case 'fed':
			mole.next = getSadOrFedOrLeavingInterval();
			mole.status = 'leaving';
			if (mole.king) {
				mole.node.children[0].src = '../images/king-mole-leaving.png';
			} else {
				mole.node.children[0].src = '../images/mole-leaving.png';
			}
			break;
		case 'leaving':
			mole.next = goneInterval();
			mole.status = 'gone';
			mole.node.children[0].classList.add('gone');
			break;
		case 'gone':
			mole.status = 'hungry';
			mole.next = getHungryInterval();
			mole.king = getKingStatus();
			mole.node.children[0].classList.remove('gone');
			mole.node.children[0].classList.add('hungry');
			if (mole.king) {
				mole.node.children[0].src = '../images/king-mole-hungry.png';
			} else {
				mole.node.children[0].src = '../images/mole-hungry.png';
			}
			break;

		case 'hungry':
			mole.next = getSadOrFedOrLeavingInterval();
			mole.status = 'sad';
			mole.node.children[0].classList.remove('hungry');
			if (mole.king) {
				mole.node.children[0].src = '../images/king-mole-sad.png';
			} else {
				mole.node.children[0].src = '../images/mole-sad.png';
			}
			break;
	}
}

let runAgainAt = Date.now() + 100;

function nextFrame() {
	const now = Date.now();
	if (runAgainAt <= now) {
		for (let i = 0; i < moles.length; i++) {
			if (moles[i].next <= now) {
				getNextStatus(moles[i]);
			}
		}
		runAgainAt = now + 100;
	}
	requestAnimationFrame(nextFrame);
}

function win() {
	document.querySelector('.bg').classList.add('hide');
	document.querySelector('.win').classList.remove('hide');
}

function feed(event) {
	if (!event.target.classList.contains('hungry')) {
		return;
	}
	const mole = moles[parseInt(event.target.dataset.index)];
	mole.status = 'fed';
	mole.next = getSadOrFedOrLeavingInterval();
	mole.node.children[0].classList.remove('hungry');
	if (mole.king) {
		mole.node.children[0].src = '../images/king-mole-fed.png';
		score += 2;
	} else {
		mole.node.children[0].src = '../images/mole-fed.png';
		score++;
	}

	if (score >= 10) {
		win();
	}
	document.querySelector('.worm-container').style.width = `${10 * score}%`;
}

document.querySelector('.bg').addEventListener('click', feed);

nextFrame();
